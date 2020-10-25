import React from 'react';

import axios from 'axios';
import {showLogin,showLoginRedirect,hideRedirect} from './showhideContent.js'





class CreateAccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '' ,  //PASS EMAIL HERE FROM emailVal
      fname: '',
      lname: '',
      password: '',
      avatar: ''
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
    let fname = this.state.fname
    let lname = this.state.lname
    let pwd = this.state.password
    let img = this.state.img

    axios({
      method: 'get',
      url: 'http://localhost:3000/AAAUsers?email='+email,
     
    })
    .then((response) => {
      if(response.data.length === 0){
        
        axios({
          method: 'post',
          url: 'http://localhost:3000/AAAUsers',
          data: {
              "email": email,
              "first_name": fname,
              "last_name": lname,
              "password": pwd,
              "avatar": img
          }
        })





        hideRedirect()
      // go to homepage
      }else{
        showLoginRedirect()
      }
    
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    



    








    event.preventDefault();


    
  }

  

  render() {
    return (
      <form name="Create Account"  id='createAccountVisibility' method="post"  className='wrapper' onSubmit={this.handleSubmit}>


<label htmlFor="email" >Enter your email:</label><br></br>
          <input type="email"  id="emailCA"  placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange}   required></input><br></br>
          <span id='emailInUse'>This Email Is already Registered</span>


          <label htmlFor="fname" >First name:</label><br></br>
          <input type="text" id="fname" placeholder="Enter First Name" name="fname" value={this.state.fname} onChange={this.handleChange} required></input><br></br>

          <label htmlFor="lname">Last name:</label><br></br>
          <input type="text" id="lname" placeholder="Enter Last Name" name="lname" value={this.state.lname} onChange={this.handleChange} required></input><br></br>

          <label htmlFor="pwd">Password:</label><br></br>
          <input type="password"  id="passwordCA"  placeholder="Enter Password" name="password" autoComplete="off" value={this.state.password} onChange={this.handleChange} required></input><br></br>

          <label htmlFor="img">Choose Avatar:</label><br></br>
          <input type="file" id="img" name="img" accept="image/*"></input><br></br>

          <input type="checkbox" id="tnd" name="tnd" value="tnd" required></input><br></br>
          <label htmlFor="vehicle1"><p>Tick to accept the <a href="https://en.wikipedia.org/wiki/Terms_of_service">Terms And Conditions</a></p> </label><br></br>


          <div className='outerButtons'>
          <input type="button" value='login' id="loginRedirect" onClick={showLogin}></input>
          <input type="submit" value="Submit" />
          <input type="reset"></input>
          </div>

      </form>

       


    );
  }
}


export default CreateAccountForm;


