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
    <div className='h-[300px] w-[300px] bg-black m-5'>Post</div>
  )
}

export default Post