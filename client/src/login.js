import React, {useState} from 'react';
import axios from 'axios';




const Login = () => {
  const [usernameReg,setUsernameReg] = useState('');
  const [passwordReg,setPasswordReg] = useState('');
  const [data,setData] = useState(null);

  
  const login = () => {
    axios({
      method: "post",
      data: {
        username: usernameReg,
        password: passwordReg
      },
      withCredentials: true,
      url: 'http://localhost:9000/login'
    }).then((res)=>{
      console.log(res);
    });
  };


  const getUser = () => {
    axios({
        method: "get",
        withCredentials: true,
        url: 'http://localhost:9000/user',
      }).then((res)=>setData(res.data));
};

  return (
    <div>
        <h1>Collections</h1>
        <nav>
            <button id="home" onClick={event =>  window.location.href='/'}>Home</button>
            <input type="text" id="search" name="search"/>
          <button id="search-button" onClick={event =>  window.location.href='/search'}>Search</button>
            <button id="login" onClick={event =>  window.location.href='/login'}>Login</button>
            <button id="register" onClick={event =>  window.location.href='/register'}>Register</button>
        </nav>
        <div id="login-form"> 
            <label>Username:</label><br/>
            <input type="text" id="username" name="username" onChange={(e)=>{setUsernameReg(e.target.value)}}/><br/>
            <label>Password:</label><br/>
            <input type="password" id="password" name="password" onChange={(e)=>{setPasswordReg(e.target.value)}}/><br/>
            <button id="login-submit" onClick={login}>Submit</button><br/>
            <button onClick={getUser}>Get User</button><br/>
            {data ? <p>Welcome Back {data.username}</p> : null}
        </div>
    </div>
  )
}

export default Login;