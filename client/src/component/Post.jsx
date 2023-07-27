import React, { useEffect } from 'react'

const Post = () => {
  useEffect(()=>{
    const fun = async () => {
      try {
        const res = await axios('/post');
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    fun()
  },[])
  return (
    <div>Post</div>
  )
}

export default Post