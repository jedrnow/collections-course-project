import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';


const Register = (props) =>{
  const [usernameReg,setUsernameReg] = useState('');
  const [passwordReg,setPasswordReg] = useState('');
  const [password2Reg,setPassword2Reg] = useState('');
  const [emailReg,setEmailReg] = useState('');

  const register = () => {
    if(passwordReg !== password2Reg){
      ReactDOM.render(<><p>Passwords must match!</p></>, document.getElementById('wrongp'));
    }else{
      axios({
        method: "post",
        data: {
          username: usernameReg,
          password: passwordReg,
          email: emailReg
        },
        withCredentials: true,
        url: 'http://localhost:9000/register'
      }).then((res)=>console.log(res.data));
     
    }
  };

  return(
    <div>
        <h1>Collections</h1>
        <nav>
          <button id="home" onClick={event =>  window.location.href='/'}>Home</button>
          <input type="text" id="search" name="search"/>
          <button id="search-button" onClick={event =>  window.location.href='/search'}>Search</button>
          <button id="login" onClick={event =>  window.location.href='/login'}>Login</button>
          <button id="register" onClick={event =>  window.location.href='/register'}>Register</button>
        </nav>
        <div id="register-form">
            <label>Email:</label><br/>
            <input type="text" id="email" onChange={(e)=>{setEmailReg(e.target.value)}}/><br/>
            <label>Username:</label><br/>
            <input type="text" id="username" onChange={(e)=>{setUsernameReg(e.target.value)}}/><br/>
            <label>Password:</label><br/>
            <input type="password" id="password" onChange={(e)=>{setPasswordReg(e.target.value)}}/><br/>
            <label>Confirm password:</label><br/>
            <input type="password" id="password2" onChange={(e)=>{setPassword2Reg(e.target.value)}}/><br/>
            <button id="register-submit" onClick={register}>Submit</button><br/>
            <p id="wrong"></p>
            <p id="wrongp"></p>
        </div>
    </div>
  )
}

export default Register;