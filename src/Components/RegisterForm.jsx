import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'
import { setCredntials } from '../store/authSlice'
function RegisterForm() {



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError("")
    try {
      setLoading(true)
      const response = await axiosInstance.post("/users/register", {
        email, password, username, role: roles
      })
      // console.log("email:", response)

      navigate("/users/login")
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || "Registtered failed.Please check your credentials.")
    }
  }
  if (loading) return <div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading.....</div>
  if (error) return <div className='text-red-600 text-center'>Something went wrong</div>
  return (
    <>
      <div className=' max-w-sm mx-auto p-6 border border-blue-200  rounded-3xl shadow-md shadow-indigo-300 mt-30 transition-all duration-200 ease-linear hover:rotate-x-4  hover:backdrop-blur-2xl'>
        <h2 className=' text-2xl font-bold mb-4 text-indigo-600 text-center'>Register</h2>
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className=' block text-indigo-400 text-sm font-bold mb-2' htmlFor="email">
              Email
            </label>
            <input type="email" id='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}
              required className=' shadow appearance-none border border-blue-50 rounded-lg hover:border-blue-400 w-full py-2 px-3 text-white  leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className='mb-4'>
            <label className=' block text-indigo-400 text-sm font-bold mb-2' htmlFor="username">
              Username
            </label>
            <input type="text" id='username' placeholder='Enter your name' onChange={(e) => setUsername(e.target.value)}
              required className=' shadow appearance-none border border-blue-50 rounded-lg hover:border-blue-400 w-full py-2 px-3 text-white  leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className='mb-4'>
            <label className=' block text-indigo-400 text-sm font-bold mb-2' htmlFor="password">
              Password
            </label>
            <input type="password" id='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}
              required className=' shadow appearance-none border border-blue-200 rounded-lg hover:border-blue-400 w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className='mb-8'>
            <label className=' block text-indigo-400 text-sm font-bold mb-2'>
              Role
            </label>
            <input type="radio" name='role' value={roles} defaultChecked="checked" onChange={(e) => setRoles(e.target.value)}
              required />
            <label className='  text-indigo-400 text-sm font-bold mb-2' >
              User
            </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name='role' value={roles} onChange={(e) => setRoles(e.target.value)}
              required />
            <label className='  text-indigo-400 text-sm font-bold mb-2'>
              Admin
            </label>
          </div>
          {error && <p className=' text-red-500 text-xs italic mb-4'>{error}</p>}
          <div className=' flex items-center justify-between'>
            <button className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50'>Sign In</button></div>{
            loading && <div>loading.....</div>
          }
          <p className='ml-15 text-centre text-sm text-gray-600 mt-6'>Already have an account?{" "}<span onClick={() => { navigate("/users/login") }} className=' text-blue-600 hover:underline cursor-pointer'>Login</span></p>
        </form>
      </div>
    </>



  )
}

export default RegisterForm