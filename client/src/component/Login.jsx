// GoogleLoginButton.js

import React, { useState } from 'react'
import {AiFillLinkedin} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {motion} from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const GoogleLoginButton = () => {
  const navigate = useNavigate()
  const [userName , setUserName] = useState('')
  const [firstName , setFirstName] = useState('')
  const [lastName , setLastName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')


  const handleLinkedinLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = 'http://localhost:5000/auth/linkedin';
  };
  const handleGoogleLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/userLogin',{
        userName,firstName,lastName,email,password
      })
      console.log(res);
      if(res.status === 203 || 202){
        navigate('/')
      }
    } catch (error) {
      navigate('/login')
      console.log(error)
    }
  }

  return (
    <div className='md:w-full h-[100vh] flex justify-center items-center flex-col '>

    <motion.div className='p-4  shadow-2xl bg-white w-[360px]' 
       initial={{opacity:0.5}}
       whileInView={{ opacity:1}}
       transition={{  duration: 0.5 }}
       exit={{opacity:0,scale:0}}
    >
    <div className='w-full flex flex-col md:flex-row justify-center items-center bg-white'>

    <button onClick={handleLinkedinLogin} className='m-2 flex justify-center items-center gap-2 border p-2  text-[14px] w-full hover:bg-black hover:text-white duration-700 '><AiFillLinkedin className='bg-white text-[20px] text-blue-800 hover:text-white duration-700'/>Login Linkedin</button>
    <button onClick={handleGoogleLogin} className='m-2 flex justify-center items-center gap-2 border p-2  text-[14px] w-full hover:bg-black hover:text-white duration-700'><FcGoogle className='bg-white text-[20px]'/>Login Google</button>
    </div>

    <hr className='border m-3' />

    <form onSubmit={handleSubmit}>
      <div className=' flex justify-center items-center flex-col bg-white'>

      <label className='text-start  w-full pl-2 text-[14px] bg-white'>User name</label>
      <input type="text" required onChange={(e)=>setUserName(e.target.value)} placeholder='User name' className='border w-full p-2 rounded-lg mb-3 text-[14px] bg-white'/>

      <div className='flex flex-row gap-5 bg-white'>
        <div className='flex justify-center items-center flex-col bg-white'>
      <label className='text-start  w-full pl-2 text-[14px] bg-white'>First name</label>
      <input type="text" required onChange={(e)=>setFirstName(e.target.value)} placeholder='First name' className='border w-full p-2 rounded-lg mb-3 text-[14px] bg-white'/>
      </div>
      <div className='flex justify-center items-center flex-col bg-white'>
      <label className='text-start  w-full pl-2 text-[14px] bg-white'>Last name</label>
      <input type="text" required onChange={(e)=>setLastName(e.target.value)} placeholder='Last name' className='border w-full p-2 rounded-lg mb-3 text-[14px] bg-white'/>
      </div>
      </div>

      <label className='text-start  w-full pl-2 text-[14px] bg-white'>Email</label>
      <input type="text" required onChange={(e)=>setEmail(e.target.value)} placeholder='Email ' className='border w-full p-2 rounded-lg mb-3 text-[14px] bg-white'/>

      <label className=' w-fulltext-start  w-full pl-2 text-[14px] bg-white'>Password</label>
      <input type="password" required onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='border w-full p-2 rounded-lg mb-3 text-[14px] bg-white'/> 
      <button className='bg-black w-full p-2 rounded text-[13px] text-white  hover:bg-white hover:shadow-lg hover:border hover:text-black duration-700'>Get Started</button>
      </div>
    </form>


    </motion.div>
    </div>
  );
};

export default GoogleLoginButton;
