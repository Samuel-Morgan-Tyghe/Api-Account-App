import React from 'react';

import axios from 'axios';
import {showLogin,showCreateAccount} from './showhideContent.js'


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
    console.log(email)
  

    axios({
      method: 'get',
      url: 'http://localhost:3000/AAAUsers?email='+email,
     
    })
    .then((response) => {
      if(response.data.length === 0){
        showCreateAccount()
        document.getElementById('emailCA').value = email;

      }else{
        showLogin()
        document.getElementById('emailL').value = email;
      }

    }, (error) => {
      
      console.log(error);
    });
    
    event.preventDefault();


    
  }

  render() {
    return (
      <form name="Email Validator" id='emailValidate'  method="post"  className='wrapper' onSubmit={this.handleSubmit}>
          <label htmlFor="email" >Enter your email:</label><br></br>
          <input type="email"  id="email"  placeholder="Enter Email" name="email" value={this.state.value} onChange={this.handleChange} required></input>
          <br></br>

        <div className='outerButtons'>
        <input type="submit" value="Submit" />
        </div>
        
      </form>

       


    );
  }
}


export default EmailValidate