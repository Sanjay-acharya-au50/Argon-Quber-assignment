import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";


import './App.css';
import Navbar from "../component/Navbar";
import Home from "../component/Home";
import Login from "../component/Login";
import Post from "../component/Post";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
    <div>
      <Navbar user={user}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" 
        element={<Login/>}
        />
        <Route path="/post" element={<Post/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
  
};
export default App;