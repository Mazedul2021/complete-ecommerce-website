import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductItem from "../ProductItem/ProductItem";
import { IoGrid } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaList } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ProductListing = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className="py-5">
      <div className="bg-white p-2 mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper fixed-bottom-[100%] left-0 w-full lg:h-full lg:static lg:w-[20%] bg-white z-[102] lg:z-[100] p-3 lg:p-0  transition-all lg:opacity-100 opacity-0 ">
            <Sidebar />
          </div>
          <div className="rightContent w-full lg:w-[80%] py-3 px-2">
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 flex items-center justify-between rounded-md">
              <div className="col1 flex items-center">
                <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full">
                  <IoGrid className="!text-[rgba(0,0,0,0.7)] text-[14px]" />
                </Button>
                <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full">
                  <FaList className="!text-[rgba(0,0,0,0.7)] text-[14px]" />
                </Button>
                <span className="text-[14px] hidden sm:block md:block lg:block font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  There are 10 products.
                </span>
              </div>
              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  Sort By
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                >
                  Sort by latest
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>Sort by latest</MenuItem>
                  <MenuItem onClick={handleClose}>sort by name: A to Z</MenuItem>
                  <MenuItem onClick={handleClose}>sort by price: low to high</MenuItem>
                  <MenuItem onClick={handleClose}>sort by price: high to low</MenuItem>
                </Menu>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
              <ProductItem />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
