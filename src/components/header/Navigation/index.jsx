import Button from '@mui/material/Button';
import React from 'react'
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';

const Navigation = () => {

  

  return (
    <nav className='nav py-2'>
        <div className='container flex items-center justify-end gap-7'>
            <div className='col-1 w-[15%] bg-slate-300 rounded-lg'>
                  <CategoryPanel/>
            </div>
            <div className='col-2 w-[85%]'>
              <ul className='flex items-center gap-5'>
                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Home</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Fashion</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Electronics</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Bags</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Footwear</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Groceries</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Beauty</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Fitness</Button>
                  </Link>
                </li>

                <li className='list-none'>
                  <Link to="/" className='link transiton text-[14px] font-[500]'>
                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Jewellery</Button>
                  </Link>
                </li>
              </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navigation;