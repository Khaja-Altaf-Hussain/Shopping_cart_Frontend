import axios from "axios";
import { updateCredentials,logout } from "../store/authSlice";
import { store } from "../store/store";


const axiosInstance = axios.create({
    baseURL:"https://shopping-cart-backend-mrp0.onrender.com/api/v1/",
    // baseURL:"/api/v1",
    withCredentials:true
})

axiosInstance.interceptors.request.use((config)=>{
    const accessToken=localStorage.getItem("accessToken")
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`
    }
    
    return config
},
(error)=>{
    return Promise.reject(error)
}
)

axiosInstance.interceptors.response.use((response)=>{
    return response
},
async(error)=>{
    const originalRequest=error.config || {}
    if(error.response && error.response.status===401 && !originalRequest._retry && !originalRequest.url.includes("refresh-token")) {
        originalRequest._retry=true
        try {
            const res= await axiosInstance.post("/users/refresh-token",{},{ withCredentials:true})
            const newAccessToken=res.data?.accessToken
            if(!newAccessToken){
                throw new Error("no access token recieve from refresh")
            }
            localStorage.setItem("accessToken",newAccessToken)
            store.dispatch(updateCredentials({
                accessToken:newAccessToken,
                
            }))
            localStorage.setItem("accessToken",newAccessToken)
        originalRequest.headers.Authorization=`Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
        } catch (err) {
            localStorage.removeItem("accessToken")
            store.dispatch(logout())
            return Promise.reject(err)
        }
    }
    return Promise.reject(error)
})
export default axiosInstance