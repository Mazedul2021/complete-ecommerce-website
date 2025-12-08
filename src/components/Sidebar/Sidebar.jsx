import React, { useState } from "react";
import { Collapse } from "react-collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../Sidebar/style.css";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";


const Sidebar = () => {

    const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);

  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">Shop by Category
            <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-black " onClick={() =>setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
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
    </aside>
  );
};

export default Sidebar;
