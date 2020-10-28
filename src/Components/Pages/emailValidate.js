import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

let email;
class EmailValidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", emailClass: "emailClass " };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (!isEmail(event.target.value)) {
      this.setState({ emailClass: "emailClass flagValidator" });
    } else {
      this.setState({ emailClass: "emailClass" });
    }
  }

  handleSubmit(event) {
    email = this.state.value;

    axios({
      method: "get",
      url: "http://localhost:3000/AAAUsers?email=" + email,
    }).then(
      (response) => {
        if (response.data.length === 0) {
          // checks if email exists

          this.setState({ redirect: "/CreateAccountForm" });
        } else {
          this.setState({ redirect: "/LoginForm" });
        }

        this.props.history.push({
          pathname: this.state.redirect,
          data: { email: this.state.value },
        });
      },
      (error) => {
        console.log(error);
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <form
        className="wrapper"
        name="Email Validator"
        method="post"
        onSubmit={this.handleSubmit}
      >
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          name="email"
          value={this.state.value}
          onChange={this.handleChange}
          className={this.state.emailClass}
          required
        ></input>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default EmailValidate;
