import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  // const data=["Laptops","Mobiles","Gaming","Accessories"],
  const data=[{
    name:"Laptops",
    url:"https://th.bing.com/th/id/OIP.ALdXF6MNAwhphOXAAv64mAHaEK?w=326&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },{
    name:"Mobiles",
    url:"https://tse1.explicit.bing.net/th/id/OIP.lOstR22MpcfSY0SWgzEMkwHaD9?w=1200&h=641&rs=1&pid=ImgDetMain&o=7&rm=3"
  },{
    name:"Gaming",
    url:"https://th.bing.com/th/id/OIP.AqRTswK_ZN_pHIke5G6uKAHaFM?w=228&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  },{
    name:"Accessories",
    url:"https://th.bing.com/th/id/OIP.n5Re2LXLQqraI2LgzxzhpQHaE8?w=253&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
  }]

  const navigate=useNavigate()
  return (
    < >
      <section className=' scroll-non border border-2xl flex flex-col h-140 w-auto md:flex-row items-center  justify-between px-10 py-16  bg-blend-difference'>
        <div className=' max-w-md p-8 ml-30 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20-xl '>
          <h1 className=' text-4xl font-bold mb-4 text-amber-50'> Upgrade Your
            <span className=' text-amber-200'>Tech </span> Experience </h1>
          <p className='text-amber-100 mb-6'>Best Deals onLaptops, Mobiles & Accessories</p>
          <div className=' flex gap-4'>
            <button onClick={()=> navigate("/products")}className=' active:scale-90 hover:bg-amber-300 px-5 py-2 rounded-full bg-amber-200 text-black font-semibold'>
              Shop Now
            </button>
          </div>
        </div>
        <div className='mix-blend-screen p-8 border  lg:mr-50 scale-150 border-none rounded-5xl'>
          <img className=' bg-no-repeat border-none bg-blend-difference' src="https://th.bing.com/th/id/OIP.ALdXF6MNAwhphOXAAv64mAHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
        </div>
      </section>
      <section className='mb-50 px-10 py-10'>
        <h2 className=' text-2xl font-semibold mb-6 text-amber-200'>Shop by Categories</h2>
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-6 h-60 '>
          {data.map((item, i) => (
            <div key={i}
              className='bg-black p-6 text-center rounded-xl  backdrop-blur-md border border-white/20 hover:rounded-4xl hover:scale-110 transition '>
              <h3 className=' text-lg text-amber-100 font-semibold mb-4'>{item.name}</h3>
              <div className='mb-7 overflow-hidden'><img src={item.url} alt={item.name} className='  bg-blend-difference border-none transform scale-150 object-fill' /></div>
              <div className='absolute   bottom-2 left-3 ml-27'><button onClick={()=>navigate(`/categories/${item.name}`)} className='  active:scale-90 hover:bg-amber-300 px-4 py-2 mix-blend-screen rounded-full text-bold    bg-amber-200 text-black'>Explore</button></div>
            </div>
          ))}
        </div>
      </section>

    </>
  )
}

export default HomePage