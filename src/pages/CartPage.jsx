import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeItem, selectCartItems, selectCartTotalPrice, updateItem } from '../store/cartSlice'

function CartPage() {
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(selectCartTotalPrice)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const quantityChangeHandler = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateItem({ productId, quantity: newQuantity }))
  }
  const removeItemHandler = (productId) => {
    dispatch(removeItem(productId))
  }
  const checkoutHandler = () => {
    alert(`Proceeding to checkout!(This feature is simulated)`)
    navigate("/checkout")
  }

  return (
    <>

      <div className='min-h-screen pt-28 px-4 sm:px-6 lg:px-0 py-6 text-white bg-gradient-to-br from-black via-gray-900 to-black'>
        <h1 className=' text-xl  sm:text-2xl md:text4xl font-bold text-center mb-10'>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className=' text-center py-20'>
            <p className=' text-lg mb-4 sm:text-xl text-gray-300 '>Your Cart is empty</p>
            <Link to="/products" className=" text-blue-600 hover:underline">Continue Shopping</Link>
          </div>
        ) : (
          <div className='max-w-6xl mx-auto '>
            <div className='space-y-6'>
              {cartItems.map(item => (
                <div key={item.product._id}
                  className=' bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg'>
                  <div className=' flex items-center gap-4 w-full sm:w-2/3 '>
                    <img src={item.product.imageUrl || ""} alt={item.product.name} className='w-16 h-16 sm:h-20 object-contain rounded-lg ' />
                    <div className=' flex-1'>
                      <h3 className=' font-semibold text-sm sm:text-base'>{item.product.name}</h3>
                      <p className='text-sm text-amber-200'>₹{item.product.price.toFixed(2)}</p>
                      <div className=' flex items-center mt-2'>
                        <button disabled={item.quantity <= 1} onClick={() => quantityChangeHandler(item.product._id, item.quantity - 1)} className=' px-3 py-1 bg-white/20 border rounded-l hover:bg-white/30'>-</button>
                        <input type="number" value={item.quantity} onChange={(e) => quantityChangeHandler(item.product._id, parseInt(e.target.value, 10))} className=' w-12 bg-transparent text-center border-white/30 border-y mx-1' min="1" />
                        <button onClick={() => quantityChangeHandler(item.product._id, item.quantity + 1)} className=' px-3 py-1 bg-white/20 rounded-r hover:bg-white/30'>+</button>
                      </div>
                    </div>
                  </div>
                  <div className=' flex flex-col items-end gap-2 w-full sm:w-1/3'>
                    <p className=' font-semibold text-lg'>₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItemHandler(item.product._id)} className='bg-red-500 text-black w-20 pr-4 pl-4 rounded-3xl hover:bg-red-400 font-semibold text-sm md:text-right '>Remove</button>
                  </div>
                </div>
              ))}
              <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6  text-right mt-10 shadow-xl'>
                <h2 className=' text-xl sm:text-2xl mb-4 font-bold'>Total: ₹{totalPrice.toFixed(2)}</h2>
                <button onClick={checkoutHandler}
                  className='w-full sm:w-auto bg-green-600  px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300'>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default CartPage






