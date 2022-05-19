import axios from 'axios';
import React from 'react';


const Logout = () =>{
    axios.get('http://localhost:9000/logout').then(res => console.log(res));
    window.location.href='/';
}





export default Logout;
