// GoogleLoginButton.js

import React from 'react';
import {AiFillLinkedin} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'

const GoogleLoginButton = () => {
  const handleLinkedinLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = 'http://localhost:5000/auth/linkedin';
  };
  const handleGoogleLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleSubmit = () => {
    console.log('submi')
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center flex-col '>

    <div className='p-4  shadow-2xl'>
    <div className='w-full flex flex-col md:flex-row justify-center items-center'>

    <button onClick={handleLinkedinLogin} className='m-2 flex justify-center items-center gap-2 border p-2  text-[14px] w-full hover:bg-black hover:text-white duration-700 '><AiFillLinkedin className='text-[20px] text-blue-800 hover:text-white duration-700'/>Login Linkedin</button>
    <button onClick={handleGoogleLogin} className='m-2 flex justify-center items-center gap-2 border p-2  text-[14px] w-full hover:bg-black hover:text-white duration-700'><FcGoogle className='text-[20px]'/>Login Google</button>
    </div>

    <hr className='border m-3' />

    <form onSubmit={handleSubmit}>
      <div className=' flex justify-center items-center flex-col'>

      <label className='text-start  w-full pl-2 text-[14px]'>User name</label>
      <input type="text" name="" id="" placeholder='User name' className='border w-full p-2 rounded-lg mb-3 text-[14px]'/>


      <div className='flex flex-row gap-5'>
        <div className='flex justify-center items-center flex-col'>
      <label className='text-start  w-full pl-2 text-[14px]'>First name</label>
      <input type="text" name="" id="" placeholder='First name' className='border w-full p-2 rounded-lg mb-3 text-[14px]'/>
      </div>
      <div className='flex justify-center items-center flex-col'>
      <label className='text-start  w-full pl-2 text-[14px]'>Last name</label>
      <input type="text" name="" id="" placeholder='Last name' className='border w-full p-2 rounded-lg mb-3 text-[14px]'/>
      </div>
      </div>

      <label className='text-start  w-full pl-2 text-[14px] '>Email</label>
      <input type="text" name="" id="" placeholder='Email ' className='border w-full p-2 rounded-lg mb-3 text-[14px]'/>

      <label className=' w-fulltext-start  w-full pl-2 text-[14px]'>Password</label>
      <input type="text" name="" id="" placeholder='Password' className='border w-full p-2 rounded-lg mb-3 text-[14px]'/> 
      <button className='bg-black w-full p-2 rounded text-[13px] text-white  hover:bg-white hover:shadow-lg hover:border hover:text-black duration-700'>Get Started</button>
      </div>
    </form>


    </div>
    </div>
  );
};

export default GoogleLoginButton;
