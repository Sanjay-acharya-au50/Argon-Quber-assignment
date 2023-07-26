// App.js
import React from 'react';
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom';
import Home from './component/Home';
import axios from 'axios'
import Login from './component/Login';
import LinkedInCallbackComponent from './component/LinkedInCallbackComponent'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true;


function App() {
 
const logout = async () => {
  try {
    const res = await axios.post('/logout');

    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <BrowserRouter>
    <div >
    <Link style={{margin : '5px'}} to='/'>home</Link>    
    <Link style={{margin : '5px'}} to='/login'>login</Link>

    <button style={{margin : '5px'}} onClick={logout}>logout</button>
</div>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/auth/linkedin/callback" component={LinkedInCallbackComponent} />
    <Route path='/login' element={<Login/>}/>




    </Routes>
    </BrowserRouter>
  );
}

export default App;
