import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { selectIsAuthenticated } from '../../store/authSlice'
import { useSelector } from 'react-redux'
import logo from "../../assets/Logo.png"
import cartlogo from "../../assets/OIP.webp"

function Header() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const categoriesData = ["Laptops", "Mobiles", "Gamings", "Accessories"]
  const catHandler = (cat) => {
    navigate(`/categories/${cat}`)
    setOpen(false)
    setMenuOpen(false)
  }
  return (
    <>
      <header className=' rounded-lg text-amber-300 md:mb-10 mb-6 bg-gradient-to-br from-black via-gray-900 to-black/10 p-4  backdrop-blur-lg  shadow-2xl hover:bg-white/10'>
        <nav className='border-gray-700 px-4 lg:px-6 py-2.5'>
          <div className='flex  justify-between items-center '>
            <Link to="/" className='ml-7 lg:ml-9 flex items-center'>
              <img src={logo} alt="Logo" className=' scale-170 mr-3 h-12' />
            </Link>
            <div className=' flex items-center gap-3'>
              {isAuthenticated && (<Link to="/cart"
                className=' text-amber-200 hover:text-amber-300 hover:bg-white/20 mix-blend-difference active:scale-90 focus:ring-indigo-700 rounded-lg   px-4 lg:px-5 py-2 lg:py-2.5 mr-2 sm:mr-0   focus:outline-none' >
                <img src={cartlogo} alt="CART" className='h-12 ' />
              </Link>)}
              {!isAuthenticated ? (<Link to="/users/login"
                className=' text-amber-200 hover:text-amber-300 hover:bg-white/20 bg-white/10 active:scale-90 focus:ring-indigo-700 font-medium rounded-lg  text-sm  w-20 px-4.5  lg:px-5 py-2 lg:py-2.5  focus:outline-none'>
                Log in
              </Link>) : (<Link to="/users/logout"
                className=' text-amber-200 hover:text-amber-300 hover:bg-white/20 bg-white/10 active:scale-90 focus:ring-indigo-700 font-medium rounded-lg  text-sm  w-20  px-2.5    lg:px-3.5 py-2 lg:py-2.5   focus:outline-none'>
                Log out
              </Link>)}
            </div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)}
            className='absolute top-10 left-3  lg:hidden p-2 rounded-md hover:bg-white/20'>
            ☰
          </button>


          <div className={`${menuOpen ? "block " : "hidden"}  lg:flex mt-4 mb-2  lg:ml-100 lg:w-auto lg:mt-0`}>
            <ul className=' flex flex-col lg:flex-row lg:space-x-8 lg:mt-0 mt-4 font-medium '>
              <li>
                <NavLink to="/" className={({ isActive }) => `block py-2 mt- pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" : "text-amber-100"}`}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/products" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" : "text-amber-100"}`}>Products</NavLink>
              </li>
              <li className='relative'>
                <NavLink onClick={() => setOpen(!open)} className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" : "text-amber-100"}`}>Categories</NavLink>
                {open && (<div className='absolute left-0 mt-2  lg:absolute bg-black z-50  backdrop-blur-lg border border-white/30 rounded-xl shadow-lg p-3 w-40'>
                  {categoriesData.map((cat, index) => (<div key={index} className=' px-3 py-2 rounded-lg hover:bg-white/30 cursor-pointer text-amber-100'><button onClick={() => catHandler(`${cat}`)} className=' cursor-pointer'>{cat}</button></div>))}</div>)}
              </li>
              {isAuthenticated && (<li>
                <NavLink to="/order-history" className={({ isActive }) => `block py-2 pr-4 pl-3  duration-200 ${isActive ? "text-amber-200" : "text-amber-100"}`}>Orders</NavLink>
              </li>)}
              {isAuthenticated && (<li>
                <NavLink to="/users/current-user" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-amber-200" : "text-amber-100"}`}>Account</NavLink>
              </li>)}
            </ul>
          </div>

        </nav>
      </header>
    </>
  )
}

export default Header