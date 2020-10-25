import React from 'react';
import './App.css';

import EmailValidate from './Components/emailValidate.js';
import CreateAccountForm from './Components/createAccount.js';
import LoginForm from './Components/login.js';

function App() {
  return (
    <div className="App">
        <div className="outer">
        <div className="inner">
       
        <EmailValidate  />
        <LoginForm />
        <CreateAccountForm />

        </div>
        </div>
    </div>
  );
}





export default App;
