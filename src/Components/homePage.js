import React from 'react';
import axios from 'axios';
import loadingIcon from '../Assets/Wedges-3s-200px.gif'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiList: [],
            loadingIcon: 'hideIcon'
           

            
            
        };
        this.handleChange = this.handleChange.bind(this);
      }


       deleteUser = (event) => {
        this.setState({loadingIcon: 'loadingIcon'})

         axios({
            method: 'DELETE',
            url: 'http://localhost:3000/AAAUsers/'+ event.target.value,
          })

          .then(response => { 
            this.componentDidMount()
            this.setState({loadingIcon: 'hideIcon'})
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });

      

      }


      addUser = () => {
        this.setState({loadingIcon: 'loadingIcon'})

       
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

          .then(response => { 
            this.componentDidMount()
            this.setState({loadingIcon: 'hideIcon'})
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        });


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
            this.setState({loadingIcon: 'loadingIcon'})


              let i
                this.setState({      
                    apiList: response.data,
                })
                this.setState({loadingIcon: 'hideIcon'})

                

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
                <div className={'apiList'} name="apiList" >

                    

                <button onClick={this.addUser}   >Add User</button>
                <img className={this.state.loadingIcon} src={loadingIcon} width='300px' height='300px' alt='Profile Pictures'></img>


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
                    
                    <div className={}>
                    <img  src={content.avatar} width='128px' height='128px' alt='Profile Pictures'></img>
                    <br></br>
                    <button onClick={this.deleteUser} value={content.id} >Delete User : {content.id}</button>
                    </div>
                        
                    </div>
                    )}
                
                </div>

              
    



            </div>
        );
      }
    }
  export default Homepage