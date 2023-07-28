import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const NormalUser = () => {
    const [exist,setExist]= useState()
    const navigate = useNavigate()


    const handleNormalUserLogout = async (e) => {
        e.preventDefault()

        try {
                const res = await axios.post('/normalUserLogout');
                console.log(res)
                if(res.status === 202){
            navigate('/login')
                }
        } catch (error) {
            navigate('/login')
            console.log(error)
        }
        console.log('logout')
    }

    useEffect(()=>{
        const fun = async () => {
           try {
            const res = await axios('/normalUserGet');
            console.log(res);
            if(res.status === 203){
                setExist(res.data);
            }
           } catch (error) {
            navigate('/login')
            console.log(error)
           }
        }
        fun()
    },[])

  return (
    <div>
        {
            exist && (
                <>
                 <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
                optio atque, quia, nobis perspiciatis nostrum ex ipsa dicta
                mollitia facilis, sint cum officiis libero saepe praesentium
                minus commodi reprehenderit illo.
              </p>
              <button onClick={handleNormalUserLogout} className='bg-black rounded-lg text-white p-2'>Logout</button>
                </>
            )
        }
        
             
    </div>
  )
}

export default NormalUser