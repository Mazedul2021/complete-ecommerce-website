import React, { useState, useRef, useEffect } from "react";
import { IoSearchSharp, IoClose, IoTrendingUp, IoSparkles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../data/products";
import { formatPrice } from "../../utils/format";

const TRENDING_TAGS = ["Automatic", "Skeleton", "NAVIFORCE", "Chronograph", "Gold", "Leather"];

const Search = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchProducts(query);

  // Keyboard shortcut listener: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const submit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
    navigate(`/shop?q=${encodeURIComponent(tag)}`);
    setFocused(false);
  };

  const goProduct = (id) => {
    navigate(`/product/${id}`);
    setFocused(false);
    setQuery("");
  };

  return (
    <div className="relative w-full">
      <form onSubmit={submit} className="relative w-full">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search watches, brands, movements... (Press '/' to focus)"
            className="w-full h-[46px] pl-11 pr-24 rounded-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder-slate-400 text-[13.5px] font-medium border border-slate-200/80 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all duration-200"
          />

          {/* Left search icon */}
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            <IoSearchSharp className="text-[20px]" />
          </div>

          {/* Right actions */}
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
                aria-label="Clear search"
              >
                <IoClose className="text-[17px]" />
              </button>
            )}

            <button
              type="submit"
              className="h-8 px-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-[12px] font-bold transition flex items-center gap-1 shadow-sm"
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Dropdown Menu */}
      {focused && (
        <div className="absolute top-[52px] left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-200/80 z-[300] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* If query is empty, show trending suggestions */}
          {!query.trim() ? (
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                <IoTrendingUp className="text-rose-500 text-[15px]" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onMouseDown={() => handleTagClick(tag)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-[12.5px] font-medium transition flex items-center gap-1"
                  >
                    <IoSparkles className="text-[11px] text-amber-500" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-[14px] font-semibold text-slate-800">
                No matching watches found
              </p>
              <p className="text-[12.5px] text-slate-500 mt-1">
                Try searching for "OLEVS", "Automatic", "Leather", or "Skeleton"
              </p>
            </div>
          ) : (
            <div>
              <div className="p-2 border-b border-slate-100 flex items-center justify-between px-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  {results.length} Products Found
                </span>
                <span className="text-[11px] text-slate-400">
                  Click to open
                </span>
              </div>

              <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-50">
                {results.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onMouseDown={() => goProduct(p.id)}
                    className="w-full flex items-center gap-3.5 p-3 hover:bg-rose-50/50 transition text-left group"
                  >
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-12 h-12 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100 shrink-0 group-hover:scale-105 transition"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-wider block">
                        {p.brand} • {p.movement}
                      </span>
                      <span className="text-[13px] font-semibold text-slate-900 group-hover:text-rose-600 transition truncate block">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {p.strap}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[14px] font-bold text-rose-600 block">
                        {formatPrice(p.price)}
                      </span>
                      {p.oldPrice > p.price && (
                        <span className="text-[11px] text-slate-400 line-through block">
                          {formatPrice(p.oldPrice)}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                onMouseDown={submit}
                className="w-full text-center py-2.5 text-[12.5px] font-bold bg-slate-50 hover:bg-rose-50 text-rose-600 transition border-t border-slate-100"
              >
                View all results for "{query}" →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
