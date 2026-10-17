import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { categories } from "../../data/categories";
import Rating from "@mui/material/Rating";
import { formatPrice } from "../../utils/format";

const BRANDS = ["OLEVS", "NAVIFORCE", "CURREN", "LIGE", "CHENXI", "SKMEI"];
const MOVEMENTS = ["Automatic", "Quartz"];

const FilterBox = ({ title, open, onToggle, count, children }) => (
  <div className="mb-4 pb-4 border-b border-slate-100 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left py-1 group"
    >
      <span className="text-[14px] font-bold text-slate-800 group-hover:text-rose-600 transition flex items-center gap-1.5">
        {title}
        {count > 0 && (
          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 text-[10.5px] font-bold flex items-center justify-center">
            {count}
          </span>
        )}
      </span>
      <span className="text-slate-400 group-hover:text-slate-700 text-[12px] transition">
        {open ? <FaAngleUp /> : <FaAngleDown />}
      </span>
    </button>
    <Collapse in={open}>
      <div className="pt-2">{children}</div>
    </Collapse>
  </div>
);

const Sidebar = ({ filters, onFilterChange, priceBounds }) => {
  const [isOpenCategory, setIsOpenCategory] = useState(true);
  const [isOpenBrand, setIsOpenBrand] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [isOpenAvailability, setIsOpenAvailability] = useState(true);
  const [isOpenRating, setIsOpenRating] = useState(true);

  const toggleCategory = (slug) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand) => {
    const brands = filters.brands || [];
    const next = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand];
    onFilterChange({ ...filters, brands: next });
  };

  const activeFiltersCount =
    filters.categories.length +
    (filters.brands?.length || 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.price[0] !== priceBounds[0] || filters.price[1] !== priceBounds[1] ? 1 : 0);

  return (
    <aside className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] sticky top-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-extrabold text-slate-900">
            Refine Catalog
          </h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[11px] font-bold">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={() =>
              onFilterChange({
                categories: [],
                brands: [],
                price: priceBounds,
                inStockOnly: false,
                minRating: 0,
              })
            }
            className="text-[12px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterBox
        title="Category"
        open={isOpenCategory}
        onToggle={() => setIsOpenCategory(!isOpenCategory)}
        count={filters.categories.length}
      >
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 py-1 px-1 rounded-lg hover:bg-slate-50 cursor-pointer text-[13px] text-slate-700 select-none"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300 accent-rose-600"
              />
              <span className="flex-1 font-medium">{cat.name}</span>
            </label>
          ))}
        </div>
      </FilterBox>

      {/* Brand Filter */}
      <FilterBox
        title="Brand"
        open={isOpenBrand}
        onToggle={() => setIsOpenBrand(!isOpenBrand)}
        count={filters.brands?.length || 0}
      >
        <div className="flex flex-wrap gap-1.5 pt-1">
          {BRANDS.map((brand) => {
            const isSelected = filters.brands?.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={`px-3 py-1 rounded-lg text-[12px] font-bold transition ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </FilterBox>

      {/* Price Range */}
      <FilterBox
        title="Price Filter"
        open={isOpenPrice}
        onToggle={() => setIsOpenPrice(!isOpenPrice)}
      >
        <div className="pt-2 px-1">
          <RangeSlider
            min={priceBounds[0]}
            max={priceBounds[1]}
            step={50}
            value={filters.price}
            onInput={(v) => onFilterChange({ ...filters, price: v })}
          />
          <div className="flex items-center justify-between pt-4 text-[12.5px] font-bold text-slate-800">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
              {formatPrice(filters.price[0])}
            </span>
            <span className="text-slate-400">—</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
              {formatPrice(filters.price[1])}
            </span>
          </div>
        </div>
      </FilterBox>

      {/* Stock Availability */}
      <FilterBox
        title="Availability"
        open={isOpenAvailability}
        onToggle={() => setIsOpenAvailability(!isOpenAvailability)}
      >
        <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer select-none">
          <span className="text-[13px] font-semibold text-slate-800">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-rose-600 accent-rose-600"
          />
        </label>
      </FilterBox>

      {/* Rating Filter */}
      <FilterBox
        title="Minimum Rating"
        open={isOpenRating}
        onToggle={() => setIsOpenRating(!isOpenRating)}
      >
        <div className="space-y-1.5">
          {[4.5, 4.0, 3.5].map((r) => (
            <button
              key={r}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  minRating: filters.minRating === r ? 0 : r,
                })
              }
              className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl text-[12.5px] transition ${
                filters.minRating === r
                  ? "bg-rose-50 text-rose-700 font-bold border border-rose-200"
                  : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Rating value={r} precision={0.5} size="small" readOnly />
                <span>{r} & up</span>
              </div>
              {filters.minRating === r && <span>✓</span>}
            </button>
          ))}
        </div>
      </FilterBox>
    </aside>
  );
};

export default Sidebar;
