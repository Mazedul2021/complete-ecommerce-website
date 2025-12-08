import React from 'react'
import Sidebar from '../Sidebar/Sidebar'


const ProductListing = () => {
  return (
    <section className='py-5'>
        <div className='bg-white py-3'>
          <div className='container flex gap-3'>
            <div className='sidebarWrapper w-[20%] h-full'>
              <Sidebar/>
            </div>
          </div>
        </div>
    </section>
  )
}

export default ProductListing