import React, { useContext, useState } from 'react'
import { Context } from '../context/Context'

const Edit = () => {

    const{edit,setEdit} = useContext(Context);
    console.log(edit)

    const Edit = () => {
        setEdit(true)
    }
  return (
    <div className='bg-white'>
        <button className='bg-blue-500 text-white p-2 rounded-lg m-1 w-[70px] justify-center items-center' onClick={Edit}>Edit</button>
    </div>
  )
}

export default Edit