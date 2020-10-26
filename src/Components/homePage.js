import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiList: [],
            id: '',
            email: '',
            first_name: '',
            last_name: '',
            avatar: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
      }

      handleChange (event)  {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

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

                this.setState({ apiList: response.data})
                console.log(response.data)

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
                    <div className={'flexRow'}><p  className={'flexcollumn'}>Email: </p>     <div className={'editableSize'} contenteditable="true" key={apiList.id}>{apiList.email}     </div></div>
                    <div className={'flexRow'}><p  className={'flexcollumn'}>First Name: </p><div className={'editableSize'} contenteditable="true" key={apiList.id}>{apiList.first_name}</div></div>
                    <div className={'flexRow'}><p  className={'flexcollumn'}>Last Name: </p> <div className={'editableSize'} contenteditable="true" key={apiList.id}>{apiList.last_name} </div></div>
                    <div className={'flexRow'}><p  className={'flexcollumn'}>Password: </p>  <div className={'editableSize'} contenteditable="true" key={apiList.id}>{apiList.password}  </div></div>
                    <img key={apiList.id} src={apiList.avatar} width='128px' height='128px'></img>

                    <br></br>

                    </div>
                    )}
                </div>

              
                {/* <div contenteditable="true"></div>
                <div contenteditable="true"></div>
                <div contenteditable="true"></div>
                <div contenteditable="true"></div>
                <div contenteditable="true"></div> */}



            </div>
        );
      }
    }
  export default Homepage