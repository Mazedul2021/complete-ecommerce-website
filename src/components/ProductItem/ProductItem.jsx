import React from 'react'

const ProductItem = () => {
  return (
    <div className='productItem overflow-hidden rounded-lg'>
        <div className='imgWrapper w-[250px] h-[250px] overflow-hidden'>
            <img src={'/src/assets/Image/product/1.webp'} className='w-full'/>
        </div>
    </div>
  )
}

export default ProductItem