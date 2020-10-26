import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './Nav';


import EmailValidate from './Components/emailValidate.js';
import CreateAccountForm from './Components/createAccount.js';
import LoginForm from './Components/login.js';
import HomePage from './Components/login.js';


function App() {
  return (
    <Router >
      <Nav />
     
    <div className="App">
        <div className="outer">
        <div className="inner">
          <Switch>

          <Route path="/EmailValidate" >
            <EmailValidate/>
          </Route>


          <Route path="/LoginForm" >
            <LoginForm/>
          </Route>

          <Route path="/CreateAccountForm"  >
            <CreateAccountForm/>
          </Route>

          <Route path="/HomePage" >
            <HomePage/>
          </Route>
          
          </Switch>
        </div>
        </div>
    </div>
    </Router>

  );
}





export default App;
