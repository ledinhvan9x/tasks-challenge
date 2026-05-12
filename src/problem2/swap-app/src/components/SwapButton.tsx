type Props = {
  loading: boolean;
  disabled: boolean;

  onClick: () => void;
};

export default function SwapButton({
  loading,
  disabled,

  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full py-2.5 rounded-lg font-medium transition
          ${
            disabled || loading
              ? "bg-gray-700 opacity-50 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
    >
      {loading ? "Processing..." : "Swap"}
    </button>
  );
}
