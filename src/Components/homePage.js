import React from 'react';
import axios from 'axios';


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiList: [],
            id: [],
            email: [],
            first_name: [],
            last_name: [],
            avatar: [],
            password: [],
            key:''


            
            
        };
        this.handleChange = this.handleChange.bind(this);
      }


      deleteUser = (event) => {
       
        axios({
            method: 'DELETE',
            url: 'http://localhost:3000/AAAUsers/'+ event.target.value,
          })

          this.componentDidMount()

      }


      addUser = (event) => {
       
        axios({
            method: 'post',
            url: 'http://localhost:3000/AAAUsers',
            data: {
                "email": "Email@email.com",
                "first_name": "First_Name",
                "last_name": "Last_Name",
                "password": "Password",
                "avatar": "https://randomuser.me/api/portraits/lego/"+ Math.floor(Math.random() * 10)+ ".jpg"
            }
          })

          this.componentDidMount()

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
        
    }

      componentDidMount = () => {

        axios({
            method: 'get',
            url: 'http://localhost:3000/AAAUsers',
          })

          .then((response) => {
              let i
                this.setState({      
                    apiList: response.data,
                })
            }, (error) => {
                alert("Error: " + error)
                console.log(error);
              });
      }

      

      render() {

        // {this.state.apiList.map((apiList, key) => 
        
        // this.state.email = apiList.email 
        
        //     )}
        return (
            
            <div className='outerApi'>
                <div className={'apiList'} name="apiList" value={this.state.apiList} onChange={this.handleChange}>

                <button onClick={this.addUser}   >Add User</button>


                    {this.state.apiList.map((content) => 

                    
                    <div className={'apiListInner'}>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>Email:</p>     
                    <div className={'editableSize'}        
                     onBlur={(e)=>{content.email = e.currentTarget.textContent}}  
                    suppressContentEditableWarning contentEditable="true" 
                    key={content.id} value={content.email} onLoad={this.handleChange} onChange={this.handleChange}>{content.email}
                    </div></div>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>First Name: </p>
                    <div className={'editableSize'} suppressContentEditableWarning contentEditable="true" 
                    >{content.first_name}</div></div>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>Last Name: </p> 
                    <div className={'editableSize'} suppressContentEditableWarning contentEditable="true" 
                    >{content.last_name} </div></div>

                    <div className={'flexRow'}><p  className={'flexcollumn'}>Password: </p>  
                    <div className={'editableSize'} suppressContentEditableWarning contentEditable="true" 
                    >{content.password}  </div></div>
                    <img  src={content.avatar} width='128px' height='128px' alt='Profile Pictures'></img>

                    <br></br>

                        <button onClick={this.deleteUser} value={content.id} >Delete User : {content.id}</button>
                    </div>
                    )}
                
                </div>

              
    



            </div>
        );
      }
    }
  export default Homepage