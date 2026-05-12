// 1. React
import { useMemo, useState } from "react";

// 2. External libraries
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

// 3. Animations / UI libs
import { pageFadeUp } from "../animations/motion";

// 4. Hooks
import { usePrices } from "../hooks/usePrices";

// 5. Components
import CurrencySelect from "./CurrencySelect";
import SwapDone from "./modals/SwapDone";
import SwapButton from "./SwapButton";

// 6. Types
import type { Balances } from "../types";

// 7. Utils
import { notifyError, notifyLoading, notifySuccess } from "../lib/toast";

export default function Swap() {
  const { prices, tokens, loading: priceLoading } = usePrices();

  const [balances, setBalances] = useState<Balances>({
    ATOM: 994,
    DAI: 821,
    BLUR: 220.3,
    BUSD: 1003.1,
  });

  const [inputToken, setInputToken] = useState("ATOM");
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [outputToken, setOutputToken] = useState("BUSD");

  const [isSwapping, setIsSwapping] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const tokenOptions = useMemo(
    () => tokens.map((t) => ({ value: t, label: t })),
    [tokens],
  );

  const outputTokenOptions = useMemo(
    () =>
      tokens
        .filter((t) => t !== inputToken)
        .map((t) => ({ value: t, label: t })),
    [tokens, inputToken],
  );

  const exchangeRate = useMemo(() => {
    const from = prices[inputToken] || 0;
    const to = prices[outputToken] || 0;
    if (!from || !to) return 0;
    return from / to;
  }, [prices, inputToken, outputToken]);

  const outputAmount = useMemo(() => {
    const from = prices[inputToken] || 0;
    const to = prices[outputToken] || 0;

    if (!inputAmount || !from || !to) return 0;

    return (inputAmount * from) / to;
  }, [inputAmount, inputToken, outputToken, prices]);

  const errorMessage = useMemo(() => {
    if (!inputAmount || inputAmount <= 0) return "Enter an amount";
    if (!outputToken) return "Must choose output token";
    if ((balances[inputToken] || 0) < inputAmount)
      return "Insufficient balance";
    return "";
  }, [inputAmount, inputToken, outputToken, balances]);

  function swapDirection() {
    setInputToken(outputToken);
    setOutputToken(inputToken);
  }

  function handleSwap() {
    if (errorMessage) {
      notifyError(errorMessage);
      return;
    }

    setIsSwapping(true);
    const loadingToast = notifyLoading("Swapping...");

    setTimeout(() => {
      setBalances((prev) => ({
        ...prev,
        [inputToken]: prev[inputToken] - inputAmount,
        [outputToken]: (prev[outputToken] || 0) + outputAmount,
      }));

      setIsSwapping(false);
      setInputAmount(0);
      setShowModal(true);

      toast.dismiss(loadingToast);
      notifySuccess("Swap successful 🎉");

      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
      });
    }, 900);
  }

  return (
    <motion.div
      {...pageFadeUp}
      className="relative max-w-xl mx-auto flex flex-col gap-5 text-white"
    >
      {/* CARD WRAPPER */}
      <div className="relative p-5 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
        {/* FROM */}
        <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
          <div className="text-gray-300 mb-2 font-medium">From</div>

          <div className="flex gap-3 items-center">
            <input
              type="number"
              value={inputAmount || ""}
              onChange={(e) => setInputAmount(Number(e.target.value))}
              placeholder="0.00"
              disabled={priceLoading}
              className="w-full px-3 py-2 text-base text-white leading-none bg-transparent outline-none rounded-lg border border-white/10 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

            <CurrencySelect
              value={inputToken}
              onChange={(token) => {
                setInputToken(token);
                if (token === outputToken) setOutputToken("");
              }}
              options={tokenOptions}
              prices={prices}
              disabled={priceLoading}
              searchable
            />
          </div>

          <div className="mt-2 text-xs text-gray-400">
            Balance:{" "}
            <span className="text-white">{balances[inputToken] || 0}</span>
          </div>
        </div>

        {/* SWAP BUTTON (floating better) */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={swapDirection}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 transition duration-300 hover:scale-110 hover:rotate-180"
          >
            ⇅
          </button>
        </div>

        {/* TO */}
        <div className="p-4 rounded-2xl bg-black/20 border border-white/10">
          <div className="text-gray-300 mb-2 font-medium">To</div>

          <div className="flex gap-3 items-center">
            <input
              value={outputAmount.toFixed(6)}
              disabled
              className="w-full px-3 py-2 text-base text-white leading-none bg-transparent outline-none rounded-lg border border-white/10 transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

            <CurrencySelect
              value={outputToken}
              onChange={setOutputToken}
              options={outputTokenOptions}
              prices={prices}
              disabled={priceLoading}
              searchable
            />
          </div>
        </div>

        {/* INFO */}
        <div className="flex justify-between text-sm text-gray-400 mt-4">
          <span>
            1 {inputToken} ≈{" "}
            <span className="text-white font-medium">
              {exchangeRate.toFixed(6)}
            </span>{" "}
            {outputToken}
          </span>

          <span className="text-cyan-400">Slippage 0.5%</span>
        </div>

        {/* ERROR */}
        <div className="mt-2 min-h-[20px]">
          <div
            className={`text-sm text-red-400 transition-opacity duration-200 ${
              errorMessage ? "opacity-100" : "opacity-0"
            }`}
          >
            {errorMessage || " "}
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div className="mt-4">
          <SwapButton
            loading={isSwapping}
            disabled={!!errorMessage || priceLoading}
            onClick={handleSwap}
          />
        </div>
      </div>

      {/* MODAL */}
      <SwapDone
        showModal={showModal}
        onClose={() => setShowModal(false)}
        fromAmount={inputAmount}
        fromToken={inputToken}
        toAmount={outputAmount}
        toToken={outputToken}
        rate={exchangeRate}
      />
    </motion.div>
  );
}
