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
          <Route path="/" exact>
            <EmailValidate />
          </Route>

          <Route path="/LoginForm">
            <LoginForm />
          </Route>

          <Route path="/CreateAccountForm">
            <CreateAccountForm />
          </Route>
          <Route path="/HomePage">
            <HomePage />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
