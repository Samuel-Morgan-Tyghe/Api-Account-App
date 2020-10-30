import React from "react";
import axios from "axios";
import loadingIcon from "../../Assets/yy3.gif";
import { Redirect } from "react-router-dom";
import deleteIcon from "../../Assets/1632602.svg";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: [],
      loadingIcon: "hideIcon",
      tempUser: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        avatar: "",
        id: 0,
      },
      logUser: null,
      email: "",
      redirect: false,
      tempAvatar: this.myRef

    };
    if (localStorage.getItem("logUser") !== null) {
      this.state.logUser = JSON.parse(localStorage.getItem("logUser"));
    } else {
      alert("How did you get here?, Hold on whilst i redirect you");
      this.setState({ redirect: true });
      this.props.history.push({
        pathname: "/",
      });
    }
    this.handleChange = this.handleChange.bind(this);
    this.myRef = React.createRef();
    this.redirect = this.redirect.bind(this);
    
  }

  componentDidMount = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/AAAUsers",
    }).then(
      (response) => {
        this.setState({ loadingIcon: "loadingIcon" });

        this.setState({
          apiList: response.data,
        });
        this.setState({ loadingIcon: "hideIcon" });
      },
      (error) => {
        alert("Error: " + error);
        console.log(error);
      }
    );
  };

  updateUser = (event) => {
    // todo : add checks to not make multiple users ( if email - '1.' + email / wont update )
    let id = event.target.value;
    let userdata = this.state.apiList.find((x) => x.id == id);

    axios({
      method: "PATCH",
      url: "http://localhost:3000/AAAUsers/" + id,

      data: {
        email: userdata.email,
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        password: userdata.password,
        avatar: userdata.avatar,
      },
    })
      .then((response) => {
        this.componentDidMount();
        this.setState({ loadingIcon: "hideIcon" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUser(email, id, event) {
    this.setState({ loadingIcon: "loadingIcon" });
    axios({
      method: "DELETE",
      url: "http://localhost:3000/AAAUsers/" + id,
    })
      .then((response) => {
        if (email === this.state.logUser.email) {
          alert("you fool, you deleted yourself");

          this.setState({ redirect: true });
        }

        this.componentDidMount();
        this.setState({ loadingIcon: "hideIcon" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addUser = () => {
    this.setState({ loadingIcon: "loadingIcon" });

    axios({
      method: "post",
      url: "http://localhost:3000/AAAUsers",
      data: {
        email: "Email@email.com",
        first_name: "First_Name",
        last_name: "Last_Name",
        password: "Password",
        avatar:
          "https://randomuser.me/api/portraits/lego/" +
          Math.floor(Math.random() * 10) +
          ".jpg",
        id: 0,
      },
    })
      .then((response) => {
        this.componentDidMount();
        this.setState({ loadingIcon: "hideIcon" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange(id, name, value, event) {

if(name === 'avatar'){

  value = event.target.files[0].name
  this.setState({tempAvatar: value})

console.log('change avatar')
}

  let new_tempUser = null;
    if (id !== this.state.tempUser.id) { //if this user exists
      console.log('trigger 1')

      new_tempUser = this.state.apiList.find((x) => x.id === id);
    } else { 
      new_tempUser = { ...this.state.tempUser };
      console.log('trigger 2')
    }
    console.log('trigger 3')
    console.log(this.state.tempUser)


    new_tempUser[name] = value;

    this.setState({ tempUser: new_tempUser });
  }

  

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    let welcomeMessage = (
      <h1>Hello Guest, Welcome to the Api Account Application</h1>
    );
    if (this.state.logUser != undefined) {
      welcomeMessage = (
        <h1>
          Hello {this.state.logUser.first_name}, Welcome to the Api Account
          Application
        </h1>
      );
    }

    if (this.state.redirect) {
      localStorage.clear();
      return <Redirect to="/" />;
    }

    return (
      <div className="outerApi">
        <div className="buttonOuterFlow">
          <button onClick={this.addUser}>Add User</button>
          <button id="signOut" onClick={this.redirect}>
            Sign Out
          </button>
        </div>

        {welcomeMessage}
        <img
          className={this.state.loadingIcon}
          src={loadingIcon}
          width="300px"
          height="300px"
          alt="Profile Pictures"
        ></img>

        {this.state.apiList.map((content) => (
          <div className={"apiListInner"} key={content.id}>
            <div className={"flexRow"}>
           


              <div className='apiListtop' >

              <label htmlFor="file-input">
              <img
                src={content.avatar}
                width="128px"
                height="128px"
                alt="Profile Pictures"
              >
              </img>
              </label>
              <input className='hideInput' type="file" id="file-input" ref={this.fileInput} 
              accept="image/*"
              onChange={(e) => this.handleChange
                (content.id,
                    "avatar",
                    this.fileInput,
                    e
                    )}
 />

            
              <button
                className="deleteButton"
                onClick={(e) => {
                  this.deleteUser(content.email, content.id);
                }}
                value={content.id}
              >
                <img src={deleteIcon}></img>
              </button>

              
              </div>

              <p className={"flexcollumn"}>Email:</p>

              <div
                className={"editableSize"}
                onBlur={(e) => {
                  this.handleChange(
                    content.id,
                    "email",
                    e.currentTarget.textContent,
                    e
                  );
                }}
                suppressContentEditableWarning
                contentEditable="true"
                value={content.email}
              >
                {content.email}
              </div>
            </div>

            <div className={"flexRow"}>
              <p className={"flexcollumn"}>First Name: </p>
              <div
                className={"editableSize"}
                onBlur={(e) => {
                  this.handleChange(
                    content.id,
                    "first_name",
                    e.currentTarget.textContent,
                    e
                  );
                }}
                suppressContentEditableWarning
                contentEditable="true"
              >
                {content.first_name}
              </div>
            </div>

            <div className={"flexRow"}>
              <p className={"flexcollumn"}>Last Name: </p>
              <div
                className={"editableSize"}
                onBlur={(e) => {
                  this.handleChange(
                    content.id,
                    "last_name",
                    e.currentTarget.textContent,
                    e
                  );
                }}
                suppressContentEditableWarning
                contentEditable="true"
              >
                {content.last_name}{" "}
              </div>
            </div>

            <div className={"flexRow"}>
              <p className={"flexcollumn"}>Password: </p>
              <div
                className={"editableSize"}
                suppressContentEditableWarning
                contentEditable="true"
              >
                {content.password}{" "}
              </div>
            </div>

            <div className="homepageOuterButtons">
              <button
                onClick={(e) => {
                  this.updateUser(e);
                }}
                value={content.id}
              >
                Update User : {content.id}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Homepage;
