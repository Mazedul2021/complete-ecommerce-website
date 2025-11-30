import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import "./style.css"
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Button from '@mui/material/Button';


const ProductItem = (props) => {
  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
        <div className='group imgWrapper w-[100%]  overflow-hidden  rounded-md rounded-bl-none rounded-br-none relative group'>
            <img src={props.img} className='w-full group-hover:scale-[1.1] transition-all duration-200'/>
            <span class="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">14%</span>
            <div className='action flex items-center top-[-200px] right-[5px] z-50 flex-col w-[50px] absolute gap-2 group-hover:top-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300'>
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary hover:!text-white group'>
                <MdOutlineZoomOutMap className='!text-[18px]'/>
              </Button>
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary hover:!text-white group'>
                <FaRegHeart className='!text-[18px]'/>
              </Button>
            </div>
        </div>
        <div className='info p-3'>
          <h6 class="text-[13px] !font-[400]"><Link class="link transition-all">Flying Machine</Link></h6>
        <h3 className='text-[12px] lg:text-[13px] title mt-1 font-[500] mb- text-[#000]'><Link to='/' className='link'>NAVIFORCE 9214 Analogue Luxury Men Watch</Link></h3>
        <Rating name="size-small" defaultValue={4} size="small" readOnly/>
        <div class="flex items-center gap-4 justify-between">
          <span class="oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]">₹2,250.00</span>
          <span class="price text-primary text-[12px] lg:text-[14px]  font-[600]">₹1,999.00</span></div>
        </div>
    </div>
  )
}

export default ProductItem