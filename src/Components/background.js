import React from 'react';

import axios from 'axios';

let apiParamaters
let random

class Background extends React.Component {


  

  constructor(props) {
    super(props);
    this.state = {backgroundImage: '', imageArray: ''};

  }


    // timeout(){
    // setTimeout(function (){

    //     random = Math.floor(Math.random() * 10)

    //     this.setState({backgroundImage: this.imageArray.hits[random].largeImageURL})
    //     console.log('you can see me after 2 seconds')


    //     this.timeout()
    // }, 1000);  
    // }
 


  componentDidMount = () => {
    apiParamaters = 'q=landscape&editors_choice=true' ;


        axios({
            method: 'get',
            url: 'https://pixabay.com/api/?key=6924970-5ebfc10830310ab9eb0bc97b8&'+ apiParamaters
          })
    
          .then((response) => {
            this.setState({imageArray: response})
            this.setState({backgroundImage: this.state.imageArray.data.hits[0].largeImageURL})

            console.log(response)

            }, (error) => {
                alert("Error: " + error)
                console.log(error);
              });

              setInterval(() => {
                random = Math.floor(Math.random() * 10)
                    this.setState({backgroundImage: this.state.imageArray.data.hits[random].largeImageURL})
              }, 10000);
  }


  
  render() {




    return (
      <div className={'backgroundDiv'}>


        <img className={'backgroundImage'} src={this.state.backgroundImage} alt={'Random Background'}></img>


      </div>
        
     
    );
  }
}


export default Background