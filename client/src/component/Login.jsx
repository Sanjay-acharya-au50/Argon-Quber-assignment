import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
 


   
  return (
    <Link to={`http://localhost:5000/auth/linkedin`} >Login with LinkedIn</Link>

  )
}

export default Login
// const handleLinkedInLogin = async () => {
//     // window.location.href = 'http://localhost:5000/auth/linkedin';
//     try {
//         const res = await axios('/auth/linkedin')
//         console.log(res)
//     } catch (error) {
//         console.log(error)
        
//     }
//   };