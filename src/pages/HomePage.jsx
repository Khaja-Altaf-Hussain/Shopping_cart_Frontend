import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  // const data=["Laptops","Mobiles","Gaming","Accessories"],
  const data=[{
    name:"Laptops",
    url:"https://th.bing.com/th/id/OIP.VlXNwuLq9Y4cu5LOPd4JmgHaE7?w=273&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },{
    name:"Mobiles",
    url:"https://tse1.explicit.bing.net/th/id/OIP.lOstR22MpcfSY0SWgzEMkwHaD9?w=1200&h=641&rs=1&pid=ImgDetMain&o=7&rm=3"
  },{
    name:"Gamings",
    url:"https://th.bing.com/th/id/OIP.7ie9Sq3Z--IzreOoNbf9SQHaFc?w=239&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },{
    name:"Accessories",
    url:"https://th.bing.com/th/id/OIP.n5Re2LXLQqraI2LgzxzhpQHaE8?w=253&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  }]

  const navigate=useNavigate()
  return (
    < >
      <section className='  flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-10 md-py-16 gap-10  bg-blend-difference'>
        <div className=' max-w-lg w-full md:w-1/2 p-6 ml-30 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 '>
          <h1 className=' text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-amber-50'> Upgrade Your
            <span className=' text-amber-200'>Tech </span> Experience </h1>
          <p className='text-amber-100 mb-6 text-sm sm:text-base'>Best Deals onLaptops, Mobiles & Accessories</p>
          
          <button onClick={()=> navigate("/products")}className=' active:scale-90 hover:bg-amber-300 px-5 py-2 rounded-full bg-amber-200 text-black font-semibold'>
            Shop Now
          </button>
        
        </div>
        <div className='mix-blend-screen w-full md:w-1/2  scale-125 '>
          <img className=' bg-no-repeat border-none w-full bg-blend-difference max-w-xs sm:max-w-sm md:max-w-md object-contain' src="https://th.bing.com/th/id/OIP.ALdXF6MNAwhphOXAAv64mAHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
        </div>
      </section>
      <section className=' px-4 sm:px-6 md:px-10 py-10'>
        <h2 className=' text-2xl sm:text-3xl font-semibold mb-6 text-amber-200'>Shop by Categories</h2>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10  '>
          {data.map((item, i) => (
            <div key={i}
              className='bg-black p-4 text-center rounded-xl  backdrop-blur-md border border-white/20 hover:rounded-4xl hover:scale-110 transition flex flex-col justify-between overflow-hidden'>
              <h3 className=' text-lg text-amber-100 font-semibold mb-3'>{item.name}</h3>
              <img src={item.url} alt={item.name} className='w-full h-32 lg:object-cover rounded-md mb-4  bg-blend-soft-light border-none transform  ' />
              <button onClick={()=>navigate(`/categories/${item.name}`)} className='mt-auto lg:w-50 lg:ml-13 active:scale-90 hover:bg-amber-300 px-4 py-2 mix-blend-screen rounded-full text-bold  font-semibold  bg-amber-200 text-black'>Explore</button>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default HomePage