import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modalBackdrop, modalContent } from "../../animations/motion";

type Props = {
  showModal: boolean;
  onClose: () => void;
  fromAmount: number;
  fromToken: string;
  toAmount: number;
  toToken: string;
  rate: number;
};

export default function SwapDone({
  showModal,
  onClose,
  fromAmount,
  fromToken,
  toAmount,
  toToken,
  rate,
}: Props) {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (showModal) {
      timerRef.current = window.setTimeout(onClose, 8000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showModal, onClose]);

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          {...modalBackdrop}
          onClick={onClose}
        >
          <motion.div
            {...modalContent}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm p-6 text-white rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0B1220] border border-white/10 shadow-2xl shadow-cyan-500/10"
          >
            {/* header */}
            <h3 className="text-lg font-semibold text-center mb-6">
              Swap Completed
            </h3>

            {/* info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>From</span>
                <span className="text-white font-medium">
                  {fromAmount} {fromToken}
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>To</span>
                <span className="text-white font-medium">
                  {toAmount.toFixed(6)} {toToken}
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Rate</span>
                <span className="text-cyan-400 font-medium">
                  1 {fromToken} ≈ {rate.toFixed(6)} {toToken}
                </span>
              </div>
            </div>

            {/* button */}
            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 transition hover:opacity-90"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
