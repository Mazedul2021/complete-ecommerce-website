import Button from '@mui/material/Button';
import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";

const Navigation = () => {
  return (
    <nav className='nav py-2'>
        <div className='container flex items-center justify-end'>
            <div className='col-1 w-[18%] '>
                  <Button className='!text-black gap-2 w-full'>
                    <RiMenu2Fill className='text-[18px]'/>
                    Shop Categories
                    <TfiAngleDown className='text-[18px] ml-auto'/>
                  </Button>
            </div>
            <div className='col-2 w-[82%]'></div>
        </div>
    </nav>
  )
}

export default Navigation;