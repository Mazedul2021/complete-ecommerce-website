import React from 'react'

const ProductItem = (props) => {
  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
        <div className='group imgWrapper w-[100%]  overflow-hidden  rounded-md rounded-bl-none rounded-br-none relative'>
            <img src={props.img} className='w-full'/>
        </div>
        <h3>NAVIFORCE 9214 Analogue Luxury Men Watch</h3>
    </div>
  )
}

export default ProductItem