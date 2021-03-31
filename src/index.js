import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


axios.interceptors.request.use(function (config) {
  
  const token = localStorage.getItem('token') || null ;

    if(token){
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }, function (error) {
     return Promise.reject(error);
  });
  
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter><App /></BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
