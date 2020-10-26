import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiList: [],
            id: 0,
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            password: ''


            
            
        };
        this.handleChange = this.handleChange.bind(this);
      }


      deleteUser(event){
          console.log(event.target.key)

        // event.target.apiList = ''
      }
      
      handleChange (event)  {
          console.log('change')

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
console.log(target +'-----'+ value +'-----'+ name)

        this.setState({
          [name]: value
        });

        // const res = await axios.put('http://localhost:3000/AAAUsers', { apiList: value });
        // res.data.json; 
        
    }

      componentDidMount = () => {
        

        axios({
            method: 'get',
            url: 'http://localhost:3000/AAAUsers',
          })

          .then((response) => {
                this.setState({ 
                    
                    apiList: response.data
                
                
                
                })


                // console.log(response.data)
                // console.log(this.state.apiList[0])


            }, (error) => {
                alert("Error: " + error)

                console.log(error);
              });
      }

      

      render() {
        return (
            
            <div className='outerApi'>
                <div className={'apiList'} name="apiList" value={this.state.apiList} onLoad={this.componentDidMount} onChange={this.handleChange}>


                    {this.state.apiList.map((apiList) => 

                    
                    <div className={'apiListInner'}>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>Email: </p>     
                    <div className={'editableSize'}         onBlur={(e)=>{this.state.apiList.email = e.currentTarget.textContent}}  suppressContentEditableWarning contentEditable="true" 
                    key={this.state.apiList} value={this.state.apiList.email} onChange={this.handleChange}>{apiList.email}
                    </div></div>


                    <div className={'flexRow'}><p  className={'flexcollumn'}>First Name: </p>
                    <div className={'editableSize'} suppressContentEditableWarning contentEditable="true" key={this.state.apiList.id}>{apiList.first_name}</div></div>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>Last Name: </p> 
                    <div className={'editableSize'} suppressContentEditableWarning contentEditable="true" key={this.state.apiList.id}>{apiList.last_name} </div></div>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>Password: </p>  
                    <div className={'editableSize'} suppressContentEditableWarning contentEditable="true" key={this.state.apiList.id}>{apiList.password}  </div></div>
                    <img key={apiList} src={apiList.avatar} width='128px' height='128px'></img>

                    <br></br>

                        <button onClick={this.deleteUser} key={this.state.apiList.id}></button>
                    </div>
                    )}
                
                </div>

              
    



            </div>
        );
      }
    }
  export default Homepage