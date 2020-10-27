import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail';


class EmailValidate extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {value: '', emailClass: 'emailClass ' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  


  handleChange(event) {
    this.setState({value: event.target.value});


    if ( !isEmail( event.target.value)){
      console.log('working')
      this.setState({emailClass: 'emailClass flagValidator'})
      }else{
      this.setState({emailClass: 'emailClass'})
      }
   
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

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }



    return (
      <form name="Email Validator" id='emailValidate'  method="post"  className='wrapper' onSubmit={this.handleSubmit}>
          {/* <label htmlFor="email" >Enter your email:</label><br></br> */}

          <input type="email" id="email"  placeholder="Enter Email" name="email" value={this.state.value} onChange={this.handleChange} className={this.state.emailClass }  required></input>

          <br></br>

        <div className='outerButtons'>
        <input type="submit" value="Submit" />
        </div>
        
      </form>
    );
  }
}


export default EmailValidate