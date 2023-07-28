import React from "react";
import Left from './Left'
import Middle from './Middle'
import Right from './Right'


const Home = () => {
 
  return (
    <div className='md:grid grid-cols-9 w-full'>
      <div className='col-span-3 flex justify-center'>
      <Right/>
      </div>
      <div className='col-span-4 h-full flex justify-center'>
      <Middle/>
      </div>
      <div className='col-span-2 md:flex justify-center md:blcok hidden '>
      <Left/>
      </div>
    </div>
  );
};

export default Home;
