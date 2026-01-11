import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ProductItem from "../ProductItem/ProductItem";
import { IoGrid } from "react-icons/io5";
import Button from "@mui/material/Button";
import { FaList } from "react-icons/fa";


const ProductListing = () => {
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
                <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full"><IoGrid className="!text-[rgba(0,0,0,0.7)] text-[14px]"/></Button>
                <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full"><FaList className="!text-[rgba(0,0,0,0.7)] text-[14px]"/></Button>
                <span className="text-[14px] hidden sm:block md:block lg:block font-[500] pl-3 text-[rgba(0,0,0,0.7)]">There are 10 products.</span>
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
