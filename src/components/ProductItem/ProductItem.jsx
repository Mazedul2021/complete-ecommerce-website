import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import "./style.css"

const ProductItem = (props) => {
  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
        <div className='group imgWrapper w-[100%]  overflow-hidden  rounded-md rounded-bl-none rounded-br-none relative'>
            <img src={props.img} className='w-full'/>
            <span class="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">14%</span>
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