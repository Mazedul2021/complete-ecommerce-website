import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { categories } from "../../data/categories";
import Rating from "@mui/material/Rating";

const FilterBox = ({ title, open, onToggle, children }) => (
  <div className="box mb-5 pb-4 border-b border-[rgba(0,0,0,0.08)]">
    <h3 className="w-full mb-2 text-[15px] font-[600] flex items-center pr-5">
      {title}
      <Button
        className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black"
        onClick={onToggle}
      >
        {open ? <FaAngleUp /> : <FaAngleDown />}
      </Button>
    </h3>
    <Collapse in={open}>{children}</Collapse>
  </div>
);

const Sidebar = ({ filters, onFilterChange, priceBounds }) => {
  const [isOpenCategory, setIsOpenCategory] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [isOpenAvailability, setIsOpenAvailability] = useState(true);
  const [isOpenRating, setIsOpenRating] = useState(true);

  const toggleCategory = (slug) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onFilterChange({ ...filters, categories: next });
  };

  return (
    <aside className="sidebar py-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[17px] font-[700]">Filters</h3>
        <button
          onClick={() =>
            onFilterChange({
              categories: [],
              price: priceBounds,
              inStockOnly: false,
              minRating: 0,
            })
          }
          className="text-[12px] font-[600] text-[#ff5252] hover:underline"
        >
          Clear all
        </button>
      </div>

      <FilterBox
        title="Shop by Category"
        open={isOpenCategory}
        onToggle={() => setIsOpenCategory(!isOpenCategory)}
      >
        <div className="scroll px-1">
          {categories.map((cat) => (
            <FormControlLabel
              key={cat.id}
              control={
                <Checkbox
                  size="small"
                  checked={filters.categories.includes(cat.slug)}
                  onChange={() => toggleCategory(cat.slug)}
                />
              }
              label={
                <span className="text-[13.5px]">{cat.name}</span>
              }
              className="w-full"
            />
          ))}
        </div>
      </FilterBox>

      <FilterBox
        title="Price Range"
        open={isOpenPrice}
        onToggle={() => setIsOpenPrice(!isOpenPrice)}
      >
        <RangeSlider
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={50}
          value={filters.price}
          onInput={(v) => onFilterChange({ ...filters, price: v })}
        />
        <div className="flex pb-2 pt-5 priceRange gap-2">
          <span className="text-black font-[500] text-[13px] border border-black px-4 py-1 rounded">
            ৳{filters.price[0]}
          </span>
          <span className="ml-auto text-black font-[500] text-[13px] border border-black px-4 py-1 rounded">
            ৳{filters.price[1]}
          </span>
        </div>
      </FilterBox>

      <FilterBox
        title="Availability"
        open={isOpenAvailability}
        onToggle={() => setIsOpenAvailability(!isOpenAvailability)}
      >
        <div className="scroll px-1">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    inStockOnly: e.target.checked,
                  })
                }
              />
            }
            label={<span className="text-[13.5px]">In Stock Only</span>}
            className="w-full"
          />
        </div>
      </FilterBox>

      <FilterBox
        title="Customer Rating"
        open={isOpenRating}
        onToggle={() => setIsOpenRating(!isOpenRating)}
      >
        <div className="scroll px-1 flex flex-col gap-1">
          {[4.5, 4.0, 3.5].map((r) => (
            <button
              key={r}
              onClick={() =>
                onFilterChange({
                  ...filters,
                  minRating: filters.minRating === r ? 0 : r,
                })
              }
              className={`flex items-center gap-2 py-1 px-2 rounded text-[13px] transition ${
                filters.minRating === r
                  ? "bg-[#fff5f5] font-[600]"
                  : "hover:bg-[#fafafa]"
              }`}
            >
              <Rating value={r} precision={0.5} size="small" readOnly />
              <span>& up</span>
            </button>
          ))}
        </div>
      </FilterBox>
    </aside>
  );
};

export default Sidebar;
