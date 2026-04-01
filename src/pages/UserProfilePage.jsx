import React, { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

function UserProfilePage() {
  const [isEditing,setIsEditing]=useState(false)
  const [user,setUser]=useState([])
  const [formData,setFormData]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    ;(async()=>{ 
      try {
        setLoading(true)
        const response=await axiosInstance.get("/users/current-user",{withCredentials:true})
        setUser(response.data.data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
  })()
  },[])
  const changeHandler=(e)=>{
    const { name,value }=e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }
  const saveHandler=async()=>{
    try {
      setLoading(true)
      const res=await axiosInstance.patch("/users/update-account",{username:formData.name,email:formData.email},{withCredentials:true})
      setUser(res.data.data)
      setIsEditing(false)
      setLoading(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.log(error)
      setError(true)
      setLoading(false)
      alert("Update failed!")
    }
  }
  const cancelHandler=()=>{setFormData(user)
    setIsEditing(false)
  }
  if (loading) return<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading.....</div>
  if(error) return <div className='text-red-600 text-center text-7xl pt-50 mb-6 animate-pulse'>Something went wrong</div>
    
  return (
    <div className=' min-h-screen px-4 pt-28 sm:px-6 lg:px-10 py-6 bg-gradient-to-br from-black via-gray-900 to-black'>
        <h1 className=' text-2xl sm:text-2xl md:text-4xl text-center font-bold text-white my-8'>Account Details</h1>
        {/* {loading &&<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading....</div>}
        {error &&<div className=' text-red-500 text-center text-7xl pt-50 mb-6'>Error....</div>} */}
        <div className=' max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl'>
          <div className=' mb-4'>
            <label className=' text-amber-300  text-sm'>Username</label>
            <input type="text" name="name" value={isEditing? formData.username: user.username} 
            onChange={changeHandler} disabled={!isEditing}
            className=' w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20'/>
          </div>
          <div className=' mb-4'>
            <label className=' text-amber-300  text-sm'>Email</label>
            <input type="email" name="email" value={isEditing? formData.email: user.email} 
            onChange={changeHandler} disabled={!isEditing}
            className=' w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20'/>
          </div>
          <div className=' mb-4'>
            <label className=' text-amber-300  text-sm'>Role</label>
            <input type="text" name="name" value={user.role} 
            disabled="true"
            className=' w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20'/>
          </div>
          
          <div className=' flex gap-4'>
            {!isEditing?(<button onClick={()=>setIsEditing(true)} 
          className=' bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg' >
            Edit
          </button>
          ):(
          <>
            <button onClick={saveHandler} 
            className=' bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg' >
              Save
            </button>
            <button onClick={cancelHandler} 
            className=' bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg' >
              Cancel
            </button>
          </>
          )
          }
          </div>
          <button onClick={()=>navigate("/users/change-password")} 
          className=' bg-purple-600 mt-4 hover:bg-purple-700 px-5 py-2 rounded-lg text-white' >
            Change Password
          </button>
        </div>
    </div>
  )
}

export default UserProfilePage