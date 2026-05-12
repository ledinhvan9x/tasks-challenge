import React, { useEffect, useMemo, useRef, useState } from "react";

export type TokenOption = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: TokenOption[];
  prices: Record<string, number>;

  label?: string;
  placeholder?: string;
  required?: boolean;
  searchable?: boolean;
  disabled?: boolean;

  hasMore?: boolean;
  onLoadMore?: () => Promise<void>;
  onSearch?: (value: string) => void;

  loading?: boolean;
};

function CurrencySelect({
  value,
  onChange,
  options,
  prices,
  label,
  placeholder = "Select token",
  required,
  searchable,
  disabled,
  hasMore,
  onLoadMore,
  onSearch,
  loading,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  const selectedLabel = useMemo(() => {
    return options.find((o) => o.value === value)?.label || "";
  }, [value, options]);

  function getTokenIcon(symbol: string) {
    return `/src/assets/${symbol}.svg`;
  }

  function toggle() {
    if (disabled) return;
    setOpen((prev) => !prev);
  }

  function handleSelect(opt: TokenOption) {
    onChange(opt.value);
    setOpen(false);
  }

  function handleClickOutside(e: MouseEvent) {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  }

  async function handleScroll() {
    const el = listRef.current;
    if (!el || !hasMore || loadingMore) return;

    const bottom = el.scrollHeight - (el.scrollTop + el.clientHeight);

    if (bottom < 50 && onLoadMore) {
      setLoadingMore(true);
      await onLoadMore();
      setLoadingMore(false);
    }
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    onSearch?.(val);
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm mb-1 text-gray-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Select box */}
      <div
        onClick={toggle}
        className={`flex items-center justify-between px-3 py-2 rounded-lg border 
        bg-gray-900 text-white cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-orange-500"}`}
      >
        <div className="flex items-center gap-2">
          {value && (
            <img src={getTokenIcon(value)} className="w-5 h-5" alt={value} />
          )}
          <span className="text-sm">{selectedLabel || placeholder}</span>
        </div>

        {loading && (
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-white rounded-full animate-bounce"></span>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-75"></span>
            <span className="w-1 h-1 bg-white rounded-full animate-bounce delay-150"></span>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="absolute z-50 mt-2 w-full max-h-64 overflow-auto 
          bg-gray-950 border border-gray-800 rounded-lg shadow-lg"
        >
          {/* Search */}
          {searchable && (
            <div className="flex items-center gap-2 p-2 border-b border-gray-800">
              <input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search token..."
                className="w-full bg-transparent outline-none text-sm text-white"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          )}

          {/* Options */}
          {filteredOptions.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-800
              ${opt.value === value ? "bg-gray-800" : ""}`}
            >
              <img src={getTokenIcon(opt.value)} className="w-5 h-5" />

              <div className="flex flex-col">
                <span className="text-sm">{opt.label}</span>
                <span className="text-xs text-gray-400">
                  {prices[opt.value] ? `$${prices[opt.value].toFixed(2)}` : "-"}
                </span>
              </div>
            </div>
          ))}

          {filteredOptions.length === 0 && (
            <div className="p-3 text-sm text-gray-400">No tokens found</div>
          )}

          {loadingMore && (
            <div className="p-2 text-center text-xs text-gray-400">
              Loading more...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(CurrencySelect);
