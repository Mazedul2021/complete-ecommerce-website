import React, { useState } from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../data/products";
import { formatPrice } from "../../utils/format";

const Search = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const results = searchProducts(query);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setFocused(false);
    setQuery("");
  };

  const goProduct = (id) => {
    navigate(`/product/${id}`);
    setFocused(false);
    setQuery("");
  };

  return (
    <div className="searchbox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <form onSubmit={submit} className="h-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search for watches, brands..."
          className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
        />
        <Button
          type="submit"
          className="!absolute top-[7px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
        >
          <IoSearchSharp className="text-[#4e4e4e] text-[24px]" />
        </Button>
      </form>

      {focused && query.trim() && (
        <div className="absolute top-[54px] left-0 w-full bg-white shadow-xl rounded-lg border border-[rgba(0,0,0,0.06)] z-[200] overflow-hidden">
          {results.length === 0 ? (
            <p className="p-4 text-[13px] text-[rgba(0,0,0,0.5)]">
              No products found for "{query}"
            </p>
          ) : (
            <>
              {results.map((p) => (
                <button
                  key={p.id}
                  onMouseDown={() => goProduct(p.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#fff5f5] text-left"
                >
                  <img
                    src={p.images[0]}
                    alt=""
                    className="w-[42px] h-[42px] object-cover rounded-md bg-[#f7f7f7]"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[10px] font-[600] text-[#ff5252] uppercase">
                      {p.brand}
                    </span>
                    <span className="block text-[13px] font-[500] truncate text-[rgba(0,0,0,0.8)]">
                      {p.name}
                    </span>
                  </span>
                  <span className="text-[13px] font-[600] text-[#ff5252]">
                    {formatPrice(p.price)}
                  </span>
                </button>
              ))}
              <button
                onMouseDown={submit}
                className="w-full text-center py-2 text-[12.5px] font-[600] bg-[#fafafa] hover:bg-[#fff5f5]"
              >
                View all results for "{query}" →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
