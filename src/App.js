import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";

import EmailValidate from "./Components/Pages/emailValidate.js";
import CreateAccountForm from "./Components/Pages/createAccount.js";
import LoginForm from "./Components/Pages/login.js";
import HomePage from "./Components/Pages/homePage.js";

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Switch>
        <div className="App">
          <Route path="/" component={EmailValidate} exact />
          <Route path="/LoginForm" component={LoginForm} />
          <Route path="/CreateAccountForm" component={CreateAccountForm} />
          <Route path="/HomePage" component={HomePage} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
