import React, { useEffect } from 'react'
import axios from 'axios'
const Post = () => {
  useEffect(()=>{
    const fun = async () => {
      try {
        const res = await axios('/auth/google/callback');
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    fun()
  },[])
  return (
    // <div className='h-[300px] w-[300px] bg-black m-5 text-white'>Post</div>
    <div className="flex mb-2 lg:order-2 ">
              <div className="relative overflow-hidden w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-tr from-orange-400 to-green-400 rounded-blob animate-san">
                {/* <img
                  src={profile}
                  alt=""
                  className="absolute top-20 -left-3 lg:top-28 lg:-left-5 scale-[1.75]"
                /> */}
              </div>
            </div>
  )
}

export default Post