import React from "react";
import axios from "axios";
import loadingIcon from "../../Assets/yy3.gif";
import { Link, Redirect } from "react-router-dom";

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
    };
    if (localStorage.getItem("logUser") !== undefined) {
      this.state.logUser = JSON.parse(localStorage.getItem("logUser"));
    } else {
      this.props.history.push({
        pathname: "/",
      }); // bug* this doesn't redirect
    }
    this.handleChange = this.handleChange.bind(this);
    this.myRef = React.createRef();
  }

  updateUser = (event) => {
    let id = event.target.value;
    let userdata = this.state.apiList.find((x) => x.id == id);

    axios({
      method: "PATCH",
      url: "http://localhost:3000/AAAUsers/" + event.target.value,

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
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  deleteUser = (event) => {
    this.setState({ loadingIcon: "loadingIcon" });

    axios({
      method: "DELETE",
      url: "http://localhost:3000/AAAUsers/" + event.target.value,
    })
      .then((response) => {
        this.componentDidMount();
        this.setState({ loadingIcon: "hideIcon" });
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
      },
    })
      .then((response) => {
        this.componentDidMount();
        this.setState({ loadingIcon: "hideIcon" });
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  handleChange(id, name, value, event) {
    let new_tempUser = null;
    if (id !== this.state.tempUser.id) {
      new_tempUser = this.state.apiList.find((x) => x.id === id);

      console.log(new_tempUser);
    } else {
      new_tempUser = { ...this.state.tempUser };
    }
    new_tempUser[name] = value;

    this.setState({ tempUser: new_tempUser });
  }

  componentDidMount = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/AAAUsers",
    }).then(
      (response) => {
        this.setState({ loadingIcon: "loadingIcon" });

        let i;
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

    return (
      <div className="outerApi">
        <div className="buttonOuterFlow">
          <button onClick={this.addUser}>Add User</button>
          <Link id="signOut" to="/">
            Sign Out
          </Link>
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
          <div className={"apiListInner"}>
            <div className={"flexRow"}>
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

            <img
              src={content.avatar}
              width="128px"
              height="128px"
              alt="Profile Pictures"
            ></img>

            <div>
              <button onClick={this.deleteUser} value={content.id}>
                Delete User : {content.id}
              </button>
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
