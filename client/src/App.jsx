import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";


import './App.css';
import './App.css';

import axios from 'axios'
import Home from './component/Home';
import Login from './component/Login';
import Post from './component/Post';
import { ContextProvider } from './context/Context';

// import Navbar from './component/Navbar';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <ContextProvider>

    <BrowserRouter>
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/post" element={<Post/>} />
      </Routes>
    </div>
    </BrowserRouter>
        </ContextProvider>
  );
  
};
export default App;