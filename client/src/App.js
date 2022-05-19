import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import Logout from './logout';



class App extends React.Component {
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {apiResponse:"", isAuthenticated: false};
  }

  handleLoginClick(){
    this.setState({isAuthenticated: true});
  }

  handleLogoutClick(){
    this.setState({isAuthenticated: false});
  }

  getState(){
    return this.state.isAuthenticated;
  }


  render() {
    return(
      <>
      <Router>
          <Routes>
            <Route  path="/"  element={<Home/>} exact/>
            <Route  path="/login"  element={<Login/>}/>
            <Route  path="/register"  element={<Register/>}/>
            <Route  path="/logout"  element={<Logout/>}/>
          </Routes>
      </Router>
      </>
      
    );
    }
}


export default App;
