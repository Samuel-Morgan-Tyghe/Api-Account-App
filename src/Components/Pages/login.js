import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailClass: "emailClass",
      emailNotInUse: "emailNotInUse",
      wrongPassword: "wrongPassword",
      submitDisable: "true",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(props) {
    // console.log("property_id",this.props.location.state.email);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    if (name === "email") {
      console.log(value)
      console.log('emailiswrong')

      if (isEmail(event.target.value)) {
        console.log('its a valid email')

        this.setState({ submitDisable: "true" });
        axios({
          method: "get",
          url: "http://localhost:3000/AAAUsers?email=" + value,
        }).then(
          (response) => {
            if (response.data.length === 0) {
              console.log( 'its not in our database')

              this.setState({ emailNotInUse: "emailNotInUse flagEmailInUse" });
              this.setState({ submitDisable: "false" });

            } else {
              console.log('its in our database')
              this.setState({ submitDisable: "true" });
              this.setState({ emailNotInUse: "emailNotInUse" });
            }
          },
          (error) => {
            console.log(error);
          }
        );
        console.log()

        this.setState({ emailClass: "emailClass" });
  
      }
      console.log(this.submitDisable)

    }
  }

  handleSubmit(event) {
    let email = this.state.email;
    let pwd = this.state.password;


    if(!this.submitDisable){
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
        <input type="submit" value="Submit"  disabled={!this.state.submitDisable} />
      </form>

      // wirecast react ,  1.5 speed code development, and keywords to research    4h

      // funtioning, routing react-- hide/show. react validation, api functions(list, update (updating as loading before axios response(button is pressed)),
      // delete) loading gif(maybe delay api)  ignore triangle(two page/signup/login)

      // check sources from 2019 atleast

      // react router dom
      // tutorials this.state show hide elements react
      // finish logic

      // react library, react validations, before submit

      // styling and responsive
    );
  }
}

export default LoginForm;
