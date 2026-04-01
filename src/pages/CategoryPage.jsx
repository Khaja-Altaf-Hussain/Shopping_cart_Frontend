import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'
import axiosInstance from '../api/axiosInstance'
import { useParams } from 'react-router-dom'


function CategoryPage() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { paramCategory } = useParams()

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                setError(false)
                const response = await axiosInstance.get('/products')
                setProducts(response.data.data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        })()
    }, [paramCategory])

    const categoryFilterProducts = products.filter(product => product.category.toLowerCase() === paramCategory.toLowerCase())
    return (
        <>
            <div className=' min-h-screen pb-10 pt-15  container mx-auto border-none  rounded-4xl  px-4 sm:px-6 lg:px-10 py-6 bg-gradient-to-br from-black via-gray-900 to-black'>
            <h1 className=' text-2xl sm:text-2xl md:text-4xl font-bold text-white my-8'>{paramCategory.substring(0,paramCategory.length-1)} Products</h1>
            {loading &&<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading....</div>}
            {error &&<div className=' text-red-500 text-center text-7xl pt-50 mb-6 animate-pulse'>Error fetching Products</div>}
                <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {categoryFilterProducts.length>0 ? (categoryFilterProducts.map(product => (<div className=' bg-white/10 backdrop-blur-lg border border-white/20  rounded-2xl p-4 shadow-lg  hover:shadow-blue-500/20 hover:shadow-2xl transition duration-300' key={product._id}>
                                <ProductCard product={product}/>
                            </div>))):(<p className='mt-35  text-amber-100 text-center text-4xl col-span-full'>No products in this category</p>)}
                </div>
            </div>
        </>
    )
}

export default CategoryPage