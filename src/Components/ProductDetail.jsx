import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addItem, selectCartItems } from '../store/cartSlice'
import axiosInstance from '../api/axiosInstance'

function ProductDetail() {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    console.log(id)
useEffect(() => {
        if (!id) return <div className='text-amber-300'>ID not found</div>
        const fetchProduct = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await axiosInstance.get(`/products/${id}`)
                setProduct(res.data.data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const addToCartHandler = () => {
        if (product) {
            const existingItem = cartItems.find(item => item?.product?._id === product?._id)
            if (existingItem) {
                alert(`${product.name} is already in your cart.You can adjust the quantity in your cart page.`)
            } else {
                dispatch(addItem(product))
                alert(`${product.name} added to cart`)
            }
        }
    }

    if (loading) return<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading.....</div>
    if(error) return <div className='text-red-600 text-center'>Something went wrong</div>
    if(!product) return <div className=' text-amber-300 text-center'>Product not found</div>

    return (
        <div className=' min-h-screen flex items-center justify-center'>
            <div className=' w-full max-w-7xl bg-black rounded-4xl backdrop-blur-7xl  flex flex-col lg:flex-row  overflow-hidden shadow-blue-500/20 shadow-2xl hover:shadow-blue-500/30  '>
                <div className=' w-full lg:w-1/2 p-4 sm:p-6 flex items-center justify-center'>
                    <img src={product.imageUrl || " "} alt={product.name} 
                    className=' w-full max-h-[250px] sm:max-h-[350px] lg:max-h-[450px] object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 ' />
                </div>
                <div className=' w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 flex flex-col justify-center text-amber-200'>
                    <h2 className=' text-amber-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3'>{product.name}</h2>
                    <p className=' text-white mb-4 text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed'>₹{Number(product.price || 0).toFixed(2)}</p>
                    <p className=' text-amber-200 text-sm sm:text-base  mb-6 leading-relaxed'>{product.description}</p>
                    <div className=' flex flex-col sm:flex-row gap-3'>
                        <button onClick={addToCartHandler}
                        className='w-full sm:w-auto bg-amber-300 hover:text-gray-900 active:scale-90 text-black px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed ' disabled={!product}>
                        Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>)
        }

export default ProductDetail