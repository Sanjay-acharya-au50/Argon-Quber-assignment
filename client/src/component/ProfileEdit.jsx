import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { motion } from 'framer-motion'


const ProfileEdit = () => {
    const {edit,setEdit} = useContext(Context)
    const handleSubmit = () => {

    }
    const Cancel = () => {
        setEdit(false)
    }
  return (
    <motion.div className='m-5'
        
      initial={{opacity:0.5}}
      whileInView={{ opacity:1}}
      transition={{  duration: 0.5 }}
      exit={{opacity:0,scale:0}}
    >
        <div className='w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center  bg-white p-3  h-[40%] w-full '>
            <input type="text" className=' m-1 p-2 rounded-md  bg-white border border-yellow-500' placeholder='Summary'/>
            <input type="text" className=' m-1 p-2 rounded-md bg-white border border-yellow-500' placeholder='About'/>
            <input type="text" className=' m-1 p-2 rounded-md bg-white border border-yellow-500' placeholder='Location'/>
            <input type="text" className=' m-1 p-2 rounded-md bg-white border border-yellow-500' placeholder='Interest'/>
            <div className='flex bg-white'>
            <button className='bg-red-500 p-2 w-[68px] text-white flex justify-center items-center m-1 rounded' onClick={Cancel}>Cancel</button>
            <button className='bg-blue-500 p-2 w-[108px] text-white flex justify-center items-center m-1 rounded'>Update</button>
            </div>
            </form>
        </div>


    </motion.div>
  )
}

export default ProfileEdit