import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {useForm} from 'react-hook-form';
import isEmail from "validator/lib/isEmail";


class EmailValidate extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

    let email = this.state.value;
  

    axios({
      method: 'get',
      url: 'http://localhost:3000/AAAUsers?email='+email,
     
    })
    .then((response) => {
      if(response.data.length === 0){

        this.setState({ redirect: "/CreateAccountForm" });

      }else{
        this.setState({ redirect: "/LoginForm" });

      }

    }, (error) => {
      
      console.log(error);
    });
    
    event.preventDefault();


    
  }

  

  render() {

    const { register, handleSubmit, errors, formState } = useForm({
      mode: "onBlur",
    });

    function onSubmit(data) {
      console.log(data);
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }



    return (
      <form name="Email Validator" id='emailValidate'  method="post"  className='wrapper' onSubmit={this.handleSubmit}>
          <label htmlFor="email" >Enter your email:</label><br></br>

          <input type="email" 
          ref={register({
          required: true,
          validate: (input) => isEmail(input), // returns true if valid
        })}
          id="email"  placeholder="Enter Email" name="email" value={this.state.value} onChange={this.handleChange} style={{ ...styles.input, borderColor: errors.email && "red" }}
          required></input>

          <br></br>

        <div className='outerButtons'>
        <input type="submit" value="Submit" />
        </div>
        
      </form>
    );
  }
}


export default EmailValidate