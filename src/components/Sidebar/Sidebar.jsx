import React, { useState } from "react";
import { Collapse } from "react-collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


const Sidebar = () => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
    const [isOpenAvaibilityFilter, setIsOpenAvaibilityFilter] = useState(true);


  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Price Range</h3>
        <RangeSlider />
        <div className="flex pb-2 pt-5 priceRange">
          <span className="text-black font-[500] text-[16px] border border-black px-6">500</span>
          <span className="ml-auto text-black font-[500] text-[16px] border border-black px-6">5000</span>
        </div>
      </div>
      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Shop by Category
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black " 
            onClick={() =>setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
                {
                    isOpenCategoryFilter===true ? <FaAngleUp/> : <FaAngleDown/>
                }
            </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-3">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Fashion"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Electronics"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Bags"
              className="w-full"
            />
             <FormControlLabel
              control={<Checkbox size="small" />}
              label="Footwear"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Groceries"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Beauty"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Fitness"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Jewelery"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Availability
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black " 
            onClick={() =>setIsOpenAvaibilityFilter(!isOpenAvaibilityFilter)}>
                {
                    isOpenAvaibilityFilter===true ? <FaAngleUp/> : <FaAngleDown/>
                }
            </Button>
        </h3>
        <Collapse isOpened={isOpenAvaibilityFilter}>
          <div className="scroll px-3">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available (21)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="In Stock (17)"
              className="w-full"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Not Available (4)"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>
      
    </aside>
  );
};

export default Sidebar;
