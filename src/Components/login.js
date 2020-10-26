import React from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {Link} from 'react-router-dom';







class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', //PASS EMAIL HERE FROM emailVal
      password: ''
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
   



  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {

    let email = this.state.email;
    let pwd = this.state.password
  

    axios({
      method: 'get',
      url: 'http://localhost:3000/AAAUsers?email='+email,
     
    })
    .then((response) => {

      if(response.data.length === 0){

        // showCreateAccountRedirect()
        }else{

          if(response.data[0].password === pwd){
            this.setState({ redirect: "/tohomepage" });


          }else{
            // showIncorrectPassword ()      
            }


        }
      
        console.log(response);
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
      <form name="loginForm"  id='loginVisibility' method="post"  className='wrapper' onSubmit={this.handleSubmit}>

      <label htmlFor="email"  >Enter your email:</label><br></br>
          <input type="email"  id="emailL"  placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange}   required></input><br></br>
          <span id='emailNotInUse'>This Email Is Not Registered</span>

          <div >
          <label htmlFor="pwd">Password:</label><br></br>
          <input type="password"  placeholder="Enter Password" id="passwordL" name="password" autoComplete="on" value={this.state.password} onChange={this.handleChange} required></input><br></br>
          <span id='passwordIncorrect'>This Password Is Not Correct</span>

          </div>


        <div className='outerButtons'>
        <Link id="CreateAccountRedirect" to="/CreateAccountForm">CreateAccountForm</Link>
        <input type="submit" value="Submit" />
        </div>


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