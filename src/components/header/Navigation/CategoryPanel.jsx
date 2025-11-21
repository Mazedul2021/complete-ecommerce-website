import Button from "@mui/material/Button";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { Link } from "react-router-dom";

const CategoryPanel = () => {
  const [isOpen, setIsOpen] = useState(false);


  const categories = [
    {
      name: "Men's Fashion",
      subCategory: [
        {
          name: "Watches",
          children: ["Digital", "Analog", "Luxury", "Casual"],
        },
        {
          name: "Shoes",
          children: ["Sneakers", "Boots", "Loafers"],
        },
      ],
    },
    {
      name: "Women's Fashion",
      subCategory: [
        {
          name: "Jewelry",
          children: ["Rings", "Bracelets", "Earrings"],
        },
        {
          name: "Bags",
          children: ["Handbags", "Backpacks", "Tote Bags"],
        },
      ],
    },
  ];

  return (
    <div className="w-fit relative py-2">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="!text-black gap-7 w-full hover:!text-[#ff5252]"
      >
        <RiMenu2Fill className="text-[18px]" />
        All Category
        <TfiAngleDown className="text-[18px] ml-auto" />
      </Button>

      {/* Main Category Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-neutral-50 border-neutral-200 shadow-lg rounded-lg z-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group/item relative px-4 py-3 border-b hover:bg-neutral-200"
            >
              <div className="w-full flex items-center justify-between cursor-pointer">
                <span className="text-sm text-neutral-700 font-medium">
                  {category.name}
                </span>

                {category.subCategory.length > 0 && (
                  <FaChevronRight className="w-2.5 h-2.5 text-neutral-500" />
                )}
              </div>

              {/* Sub Category */}
              {category.subCategory.length > 0 && (
                <div className="absolute top-0 left-full w-48 hidden group-hover/item:block bg-neutral-50 border border-neutral-200 shadow-lg rounded-lg">
                  {category.subCategory.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="group/sub relative border-b hover:bg-neutral-200"
                    >
                      <div className="flex justify-between items-center px-4 py-3 text-sm text-neutral-700 cursor-pointer">
                        {sub.name}

                        {sub.children?.length > 0 && (
                          <FaChevronRight className="w-2.5 h-2.5 text-neutral-500" />
                        )}
                      </div>

                      {/* Sub-Sub Category */}
                      {sub.children?.length > 0 && (
                        <div className="absolute top-0 left-full w-48 hidden group-hover/sub:block bg-neutral-50 border border-neutral-200 shadow-lg rounded-lg">
                          {sub.children.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              to="/"
                              className="block px-4 py-3 text-sm text-neutral-600 border-b hover:bg-neutral-200"
                            >
                              {child}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPanel;
