import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { categories } from "../../../data/categories";
import { products } from "../../../data/products";
import "./style.css";

const CategoryPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const countFor = (slug) =>
    products.filter((p) => p.category === slug).length;

  return (
    <div
      ref={panelRef}
      className="w-fit relative py-2 z-[100]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="!text-black gap-6 w-full hover:!text-[#ff5252] !normal-case"
      >
        <RiMenu2Fill className="text-[18px]" />
        <span className="text-[14px] font-[600]">All Categories</span>
        <TfiAngleDown
          className={`text-[16px] ml-auto transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Main Category Dropdown */}
      {isOpen && (
        <div className="catDropdown absolute top-full left-0 w-[300px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-b-lg border border-[rgba(0,0,0,0.06)] overflow-visible">
          <ul className="py-1">
            {categories.map((category) => (
              <li key={category.id} className="catRow relative">
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="flex items-center gap-3 px-4 py-[10px] border-b border-[rgba(0,0,0,0.05)] hover:bg-[#fff5f5] transition-colors"
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-[26px] h-[26px] object-contain"
                  />
                  <span className="text-[13.5px] text-[rgba(0,0,0,0.75)] font-[500] group-hover:text-[#ff5252]">
                    {category.name}
                  </span>
                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-[11px] text-[rgba(0,0,0,0.4)]">
                      {countFor(category.slug)}
                    </span>
                    {category.subCategories.length > 0 && (
                      <FaChevronRight className="rowArrow w-2.5 h-2.5 text-[rgba(0,0,0,0.35)]" />
                    )}
                  </span>
                </Link>

                {/* Flyout: sub categories + children */}
                {category.subCategories.length > 0 && (
                  <div className="flyout absolute top-0 left-full ml-[2px] w-[540px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-lg border border-[rgba(0,0,0,0.06)] p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-[15px] font-[600]">
                        {category.name}
                      </h4>
                      <Link
                        to={`/shop?category=${category.slug}`}
                        className="text-[12px] font-[500] text-[#ff5252] hover:underline"
                      >
                        View all ({countFor(category.slug)}) →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {category.subCategories.map((sub) => (
                        <div key={sub.slug} className="megaCol">
                          <Link
                            to={`/shop?category=${category.slug}`}
                            className="!text-[14px] !font-[600] !text-black !pb-1"
                          >
                            {sub.name}
                          </Link>
                          <ul className="mt-1">
                            {sub.children?.map((child) => (
                              <li key={child}>
                                <Link
                                  to={`/shop?category=${category.slug}`}
                                >
                                  {child}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="bg-[#fff5f5] px-4 py-3 flex items-center justify-between">
            <span className="text-[12px] font-[600] text-[#ff5252]">
              🔥 Up to 50% Off — Winter Sale
            </span>
            <Link
              to="/shop"
              className="text-[12px] font-[600] underline hover:text-[#ff5252]"
            >
              Shop now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPanel;
