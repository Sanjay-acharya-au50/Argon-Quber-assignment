import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const handleLogout = () => {
    // Perform any client-side logout logic if needed
    // (e.g., clearing local storage, resetting user state, etc.)
    
    // Then, redirect the user to the server-side logout route
    window.location.href = 'http://localhost:5000/logout';
  };

  return (
    <div style={{display:'flex', gap:'20px'}} className='bg-black h-[70px] text-white flex justify-center items-center'>
            <Link to={'/'}>home</Link>
            <Link to={'/login'}>login</Link>
            <Link to={'/post'}>post</Link>
            {/* <button onClick={handleLogout}>logout</button> */}
    </div>
  )
}

export default Navbar