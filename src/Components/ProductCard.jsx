import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  if (!product) return null
  return (
    <>
      <Link to={`/products/${product._id}`}>
        <div className=' bg-white/10 backdrop-blur-lg border border-white/20  rounded-2xl  overflow-hidden shadow-lg  hover:shadow-blue-500/20 hover:shadow-2xl transition duration-200 cursor-pointer'>
          <div className=' overflow-hidden border-b-2 border-b-white/10'>
            <img src={product.imageUrl || ""} alt={product.name}
              className=' w-full h-40 sm:h-44 md:h-48 border-none object-cover transition-transform duration-300 hover:scale-105' />
          </div>
          <div className='p-4  text-white'>
            <h3 className=' text-sm sm:text-base md:text-lg font-semibold mb-2 line-clamp-2'>{product.name}</h3>
            <p className=' text-amber-300 font-bold text-lg'>₹{Number(product.price || 0).toFixed(2)}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProductCard