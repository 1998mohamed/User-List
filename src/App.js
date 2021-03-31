
import React, { useState, useEffect } from 'react'
import { Route, Router } from 'react-router';
import ClipLoader from 'react-spinners/ClipLoader';
import Home from './components/home';
import Login from './components/login'



function App() {

    const  [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      },5000)
    },[])
    return (
      <div>
      {
      loading ?    
        <div className="spinner"><ClipLoader color={"#000000"} loading={loading} size={150} /></div>
        :
      <switch>
        <Route path={'/login'} component={Login}/>
        <Route path={'/home'} component={Home}/>
      </switch>
  }
      </div>
      
    );
  }

export default App ;