import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                await axiosInstance.post("/users/logout", { withCredentials: true })
                dispatch(logout())
                navigate("/users/login")
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(true)
            }
            navigate("/users/login")
        })()
    }, [])

    if (loading) return<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading.....</div>
    if(error) return <div className='text-red-600 text-center'>Something went wrong</div>
    return (
        <>
            <div className=' text-2xl sm:text-2xl md:text-4xl font-bold text center text-white my-8'>Logout Successfully</div>
        </>
    )
}

export default Logout