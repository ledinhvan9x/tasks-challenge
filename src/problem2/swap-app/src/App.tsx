import SwapCard from "./components/SwapCard";

export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-white overflow-hidden bg-[#070A12]">
      {/* GRID OVERLAY */}
      <div className="fixed inset-0 -z-10 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* HEADER */}
      <header className="text-center mb-12 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight leading-snug">
          Instant token swaps on{" "}
          <span className="text-cyan-400 font-bold">market rates</span>
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          Lightning-fast swaps with deep liquidity & minimal slippage
        </p>

        <div className="mt-5 mx-auto w-36 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
      </header>

      {/* CARD */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-r from-orange-500 via-cyan-500 to-purple-500 rounded-3xl" />

        <div className="relative">
          <SwapCard />
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 text-xs text-slate-500">
        Powered by on-chain liquidity • No custody • Instant execution
      </div>
    </div>
  );
}
