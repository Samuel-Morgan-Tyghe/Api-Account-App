import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav';


import EmailValidate from './Components/emailValidate.js';
import CreateAccountForm from './Components/createAccount.js';
import LoginForm from './Components/login.js';
import HomePage from './Components/homePage.js';


function App() {
  return (
    <Router >
      <Nav />
      <Switch></Switch>
    <div className="App loader-container">
        
         

          <Route path="/EmailValidate" >
        <div className="outer">
        <div className="inner">
            <EmailValidate/>
        </div>
        </div>
          </Route>
          

          <Route path="/LoginForm" >
          <div className="outer">
        <div className="inner">
            <LoginForm/>
            </div>
        </div>
          </Route>

          <Route path="/CreateAccountForm"  >
          <div className="outer">
        <div className="inner">
            <CreateAccountForm/>
            </div>
        </div>
          </Route>
         
          <Route path="/HomePage" >
            <HomePage/>
          </Route>
        
        
    </div>
    <Switch />
    </Router>

  );
}





export default App;
