import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";


import './App.css';
import './App.css';

import axios from 'axios'
import Home from './component/Home';
import Login from './component/Login';
import Post from './component/Post';
import { Context } from './context/Context';
import Register from './component/Register';
import NormalUserHome from './component/NormalUserHome';

// import Navbar from './component/Navbar';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;

const App = () => {
  const {userProtect,userProtectSo} = useContext(Context)
  console.log("userProtect:",userProtect,"userProtectSo",userProtectSo)
  return (

    <BrowserRouter>
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={
         <>
         {/* {userProtectSo?.email ? <Home/> : <Navigate to={'/login'}/>} */}
         <Home/>
         </>

        }/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/post" element={<Post/>} />

        <Route path="/profile" element={
          <>
          {userProtect?.email ? <NormalUserHome/> : <Navigate to={'/login'}/>}
          </>
        } />
      </Routes>
    </div>
    </BrowserRouter>

  );
  
};
export default App;