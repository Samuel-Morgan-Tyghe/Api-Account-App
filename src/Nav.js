import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul className="nav-links ">
      <Link to="/">
        <li>EmailValidate</li>
      </Link>
      <Link to="/LoginForm">
        <li>LoginForm</li>
      </Link>
      <Link to="/CreateAccountForm">
        <li>CreateAccountForm</li>
      </Link>
      <Link to="/HomePage">
        <li>HomePage</li>
      </Link>
    </ul>
  );
}

export default Nav;
