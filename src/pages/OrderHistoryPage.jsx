import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { mockOrders } from '../mockData/order'

function OrderItem({ order }) {
    const formattedDate = new Date(order.orderDate).toLocaleDateString()
    return (
        <>
            <div className=' bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl  p-4 sm:p-6 mb-6 shadow hover:shadoe-blue-500/20 hover:shadow-2g transition duration-300'>
                <div className=' flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2'>
                    <span className=' font-semibold text-white text-sm sm:text-base'>Order ID: #{order._id.substring(4)}</span>
                    <span className='text-xs sm:text-sm text-gray-300'>{formattedDate}</span>
                </div>
                <div className=' space-y-1 mb-4'>
                    {
                        order.items.map(item=>(
                            <p className=' text-sm text-amber-300' key={item.productId}>
                                {item.quantity} x {item.name} -
                                <span className=' text-amber-200 font-medium ml-2'>₹{item.price.toFixed(2)}</span>
                            </p>
                        ))
                    }
                </div>
                <div className=' flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 pt-4 border-t-white/20'>
                    <span className=' font-semibold text-white'>Total: ₹{order.totalAmount.toFixed(2)}</span>
                    <span className=' text-xs sm:text-sm font-medium py-1 px-3 rounded-full bg-green-500 '>
                        {order.status}
                    </span>
                </div>
            </div>
        </>
    )
}


function OrderHistoryPage() {
    const [orders,setOrders]=useState([])
    const [loading,setLoading]=useState(false)
    const isAuthenticated=useSelector(selectIsAuthenticated)
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchOrders=async()=>{
            console.log("Called")
            setLoading(false)
            // setLoading(true)
            try {
                setLoading(true)
                setOrders(mockOrders)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.log("Failed to fetch orders:",err)
            }
        }
        if(!isAuthenticated){
            navigate("/users/login")
        }else{
            console.log("Calledwdw")
            fetchOrders()
        }
    },[isAuthenticated])
    if(loading){
        return <div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading.....</div>
    }
    console.log(orders)
    return(
        <>
            <div className=' min-h-screen px-4 pt-28 sm:px-6 lg:px-10 py-6 bg-gradient-to-br from-black via-gray-900 to-black'>
                <h1 className=' text-2xl sm:text-2xl md:text-4xl text-center font-bold text-white my-8'>Order History</h1>
                <div className=' max-w-5xl mx-auto'>
                {
                    orders.length===0 ?( 
                    <p className='mt-35  text-amber-100 text-center text-4xl col-span-full'>You have no past orders.</p>):
                    (
                        orders.map(order=> (
                            <OrderItem key={order._id} order={order}/>
                        ))
                    )
                }
                </div>
            </div>
        </>
    )
}


export default OrderHistoryPage