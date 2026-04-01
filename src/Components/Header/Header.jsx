import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../store/authSlice'
import {  useSelector } from 'react-redux'
import logo from "../../assets/Logo.png"
import cartlogo from "../../assets/OIP.webp"

function Header() {
  const [open,setOpen]=useState(false)
  const isAuthenticated=useSelector(selectIsAuthenticated)
  const navigate=useNavigate()
  const categoriesData=["Laptops","Mobiles","Gamings","Accessories"]
  const catHandler=(cat)=>{
    navigate(`/categories/${cat}`)
    setOpen(!open)
  }
  return(
    <>
      <header className='  rounded-lg text-amber-300 mb-10 bg-gradient-to-br from-black via-gray-900 to-black/10 p-4   top-0 backdrop-blur-lg  shadow-2xl hover:bg-white/10'>
        <nav className='border-gray-700 px-4 lg:px-6 py-2.5'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen'>
            <Link to="/" className=' flex items-center'>
              <img src={logo} alt="Logo" className=' scale-170 indexmr-3 h-12' />
            </Link>
            <div className=' flex items-center lg:order-2'>
              {isAuthenticated && (<Link to="/cart" 
              className=' text-amber-200 hover:text-amber-300 hover:bg-white/20 mix-blend-darken active:scale-90 focus:ring-indigo-700 font-medium rounded-lg  text-sm  px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none' >
                <img src={cartlogo} alt="CART" className='h-12 mix-blend-multiply' />
              </Link>)}
              {!isAuthenticated?(<Link to="/users/login" 
              className=' text-amber-200 hover:text-amber-300 hover:bg-white/20 bg-white/10 active:scale-90 focus:ring-indigo-700 font-medium rounded-lg  text-sm  px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                Log in
              </Link>):(<Link to="/users/logout"  
              className=' text-amber-200 hover:text-amber-300 hover:bg-white/20 bg-white/10 active:scale-90 focus:ring-indigo-700 font-medium rounded-lg  text-sm  px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                Log out
              </Link>)}
            </div>
            <div className=' hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'>
              <ul className=' flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                <li>
                  <NavLink to="/" className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" :"text-amber-100"}`}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/products" className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" :"text-amber-100"}`}>Products</NavLink>
                </li>
                <li>
                  <NavLink  onClick={()=> setOpen(!open)} className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" :"text-amber-100"}`}>Categories</NavLink>
                  {open && (<div className=' absolute bg-white/20 z-50  backdrop-blur-lg border border-white/30 rounded-xl shadow-lg p-3 w-40'>
                  {categoriesData.map((cat,index)=>(<div key={index}  className=' px-3 py-2 rounded-lg hover:bg-white/30 cursor-pointer text-amber-100'><button onClick={()=>catHandler(`${cat}`)} className=' cursor-pointer'>{cat}</button></div>))}</div>)}
                </li>
                {isAuthenticated && (<li>
                  <NavLink to="/order-history" className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" :"text-amber-100"}`}>Orders</NavLink>
                </li>)}
                {isAuthenticated && (<li>
                  <NavLink to="/users/current-user" className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" :"text-amber-100"}`}>Account</NavLink>
                </li>)}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header