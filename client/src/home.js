import React from 'react';


const Home = () =>{
    return(
      <div>
          <h1>Collections</h1>
          <nav>
            <button id="home" onClick={event =>  window.location.href='/'}>Home</button>
            <input type="text" id="search" name="search"/>
            <button id="search-button" onClick={event =>  window.location.href='/search'}>Search</button>
            <button id="login" onClick={event =>  window.location.href='/login'}>Login</button>
            <button id="logout" onClick={event =>  window.location.href='/logout'}>Logout</button>
            <button id="register" onClick={event =>  window.location.href='/register'}>Register</button>
          </nav>
          <p>This is homepage!</p>
      </div>
    )
}





export default Home;
