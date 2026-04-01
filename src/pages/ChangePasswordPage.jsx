import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

function ChangePasswordPage() {
    const [formPasswordData, setFormPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const changeHandler = (e) => {
        const { name, value } = e.target
        setFormPasswordData((prev) => ({ ...prev, [name]: value }))
    }
    const changePasswordHandler = async () => {
        try {
            setLoading(true)
            await axiosInstance.post("/users/change-password", setFormPasswordData, { withCredentials: true })
            navigate("/")
            setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    if (loading) return<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading.....</div>
    if(error) return <div className='text-red-600 text-center text-7xl pt-50 mb-6 animate-pulse'>Something went wrong</div>

    return (
        <>
            <div className=' min-h-screen px-4 pt-28 sm:px-6 lg:px-10 py-6 bg-gradient-to-br from-black via-gray-900 to-black'>
                <h1 className=' text-2xl sm:text-2xl md:text-4xl text-center font-bold text-white my-8'>Change Password</h1>
                {/* {loading &&<div className=' text-amber-300 text-center text-7xl pt-50 mb-6 animate-pulse'>Loading....</div>}
                {error &&<div className=' text-red-500 text-center text-7xl pt-50 mb-6 animate-pulse'>Error....</div>} */}
                <div className=' max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl'>
                    <div className=' mb-4'>
                        <label className=' text-amber-300  text-sm'>Old Password</label>
                        <input type="password" name="oldPassword" value={formPasswordData.oldPassword}
                            onChange={changeHandler} 
                            className=' w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20' />
                    </div>
                    <div className=' mb-4'>
                        <label className=' text-amber-300  text-sm'>New Password</label>
                        <input type="password" name="newPassword" value={formPasswordData.newPassword}
                            onChange={changeHandler} 
                            className=' w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20' />
                    </div>
                    <div className=' mb-4'>
                        <label className=' text-amber-300  text-sm'>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formPasswordData.confirmPassword}
                            onChange={changeHandler} 
                            className=' w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20' />
                    </div>
                    <div><button onClick={changePasswordHandler}
                        disabled={loading}
                        className=' bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold disabled:opacity-50 px-6 py-3 rounded-lg' >
                        Change Password
                    </button></div>
                </div>
            </div>
        </>
    )
}

export default ChangePasswordPage