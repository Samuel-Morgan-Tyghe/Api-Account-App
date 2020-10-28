import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";


import {
  BrowserRouter as 
  useLocation
} from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailClass: "emailClass",
      emailNotInUse: "emailNotInUse",
      wrongPassword: "wrongPassword",
      submitBool: true,
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
//     let location = useLocation();
// console.log(location)
     console.log("property_id",this.props.location.state);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    if (name === "email") {
      this.setState({ submitBool: false });

      if (isEmail(event.target.value)) {

        axios({
          method: "get",
          url: "http://localhost:3000/AAAUsers?email=" + value,
        }).then(
          (response) => {
            if (response.data.length === 0) {

              this.setState({ emailNotInUse: "emailNotInUse flagEmailInUse" });

            } else {
              this.setState({ submitBool: true });

              this.setState({ emailNotInUse: "emailNotInUse" });
            }
          },
          (error) => {
            console.log(error);
          }
        );

        this.setState({ emailClass: "emailClass" });
  
      }

    }
  }

  handleSubmit(event) {
    let email = this.state.email;
    let pwd = this.state.password;

    if(this.state.submitBool){

    axios({
      method: "get",
      url: "http://localhost:3000/AAAUsers?email=" + email,
    }).then(
      (response) => {
        if (response.data[0].password === pwd) {
          this.setState({ redirect: "/tohomepage" });
        } else {
          this.setState({ wrongPassword: "wrongPassword flagWrongPassword" });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    }

    event.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <form 
        className="wrapper"
        name="loginForm"
        method="post"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          className={this.state.emailClass}
          placeholder="Enter Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        ></input>
        <span className={this.state.emailNotInUse}>
          This Email Is Not Registered
        </span>

        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          className={"roundedInput"}
          placeholder="Enter Password"
          name="password"
          autoComplete="on"
          value={this.state.password}
          onChange={this.handleChange}
          required
        ></input>
        <span className={this.state.wrongPassword}>
          This Password Is Not Correct
        </span>

        <Link to="/CreateAccountForm">CreateAccountForm</Link>
        <input type="submit" value="Submit"  disabled={!this.state.submitBool} />
      </form>


    );
  }
}

export default LoginForm;
