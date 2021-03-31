import React, {useState, useEffect} from 'react';
import { Input } from "reactstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';






const Login = (props) =>{

    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history = useHistory();

    const Auth = (e) => {

       
    
      axios.post ('https://academy-training.appssquare.com/api/login', {email , password})
      .then(
          data => {
            localStorage.setItem("token", data.data.token)

           history.push('/home')
          }
     )
      
    
    }
    return (
        <div>
          
          <div className="col-sm-6 offset-sm-3">
          <h3>Log In</h3>
          <Input type="text"  
          placeholder="email" 
          onChange={(e)=>setEmail(e.target.value)}
          className="form-input"></Input>
          <br />
          <Input type="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
          ></Input>
          <br />
          <button  onClick={Auth} className="btn btn-primary">Login</button>
          </div>
        </div>
      )
    }
  
  
  export default Login;
  
