import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import "./style.css"
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Button from '@mui/material/Button';
import Product1 from "../../assets/Image/product/1.webp"
import { FaCartPlus } from "react-icons/fa";



const ProductItemListView = (props) => {
  return (
    <div className='productItem p-4 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center flex-col lg:flex-row'>
        <div className='group imgWrapper w-full lg:w-[25%]  overflow-hidden  rounded-md relative'>
            <Link to="/">
              <div className='img  overflow-hidden'>
                <img src={Product1} className='w-full group-hover:scale-[1.1] transition-all duration-200'/>
              </div>
            </Link>
            <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">14%</span>
            <div className='action flex items-center top-[-200px] right-[5px] z-50 flex-col w-[50px] absolute gap-2 group-hover:top-[15px] opacity-0 group-hover:opacity-100 transition-all duration-300'>
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary hover:!text-white group'>
                <MdOutlineZoomOutMap className='!text-[18px]'/>
              </Button>
              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-white !rounded-full hover:!bg-primary hover:!text-white group'>
                <FaRegHeart className='!text-[18px]'/>
              </Button>
            </div>
        </div>
        <div className='info p-3 py-3 w-[75%]'>
          <h6 className="text-[13px] !font-[400]"><Link className="link transition-all">Flying Machine</Link></h6>
        <h3 className='text-[12px] lg:text-[18px] title mt-3 mb-3 font-[500] text-[#000]'><Link to='/' className='link'>NAVIFORCE 9214 Analogue Luxury Men Watch</Link></h3>
        <p className='text-[14px] mb-3'>Lorem Ipsum is simply dummy text of the printing and typessdfsdfsdfsdfetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <Rating name="size-small" defaultValue={4} size="small" readOnly/>
        <div className="flex items-center gap-4 ">
          <span className="oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]">৳2,250.00</span>
          <span className="price text-primary text-[12px] lg:text-[14px]  font-[600]">৳1,999.00</span></div>
          <div className='mt-3'>
            <Button className='btn-org gap-2'><FaCartPlus className='text-[18px]' /> Add to Cart</Button>
          </div>
        </div>
    </div>
  )
}

export default ProductItemListView