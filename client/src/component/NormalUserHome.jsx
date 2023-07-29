import React from 'react'
import NormalUser from './NormalUser'

import Left from './Left'
import Nmiddle from './Nmiddle'

const NormalUserHome = () => {
  return (

        <div className='md:grid grid-cols-9 w-full'>
      <div className='col-span-3 flex justify-center '>
      <NormalUser/>
      </div>
      <div className='col-span-4  flex justify-center'>
      <Nmiddle/>
      </div>
      <div className='col-span-2 md:flex justify-center md:blcok hidden '>
      <Left/>
      </div>
      </div>

  )
}

export default NormalUserHome