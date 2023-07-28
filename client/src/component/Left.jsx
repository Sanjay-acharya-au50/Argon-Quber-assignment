import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Left = () => {
  return (
    <motion.div className='flex flex-col border h-[400px] w-full sticky top-0 m-8 text-start gap-5 p-10 bg-white shadow-2xl'
    
    
    initial={{opacity:0.5}}
    whileInView={{ opacity:1}}
    transition={{  duration: 0.5 }}
    exit={{opacity:0,scale:0}}
    >
    <Link to={'/'} className='bg-white'>Home</Link>
    <div className='bg-white'>Contact</div>
    <Link to={'/'} className='bg-white'>Drive Link</Link>
    <a href={'https://github.com/Sanjay-acharya-au50/Argon-Quber-assignment'} className='bg-white'>Github Repo</a>
    <a href={'https://www.linkedin.com/in/sanjay-achari-693a58121'} className='bg-white'>Linked Profile</a>
    <a href={'https://console.cloud.google.com/welcome?project=devsanjay'} className='bg-white'>Google Api Doc</a>
    <a href={'https://developer.linkedin.com/'} className='bg-white'>Facebook Api Doc</a>
    </motion.div>
  )
}

export default Left