import React from "react";
import axios from "axios";
import loadingIcon from "../../Assets/loading2.gif";
import { Redirect } from "react-router-dom";
import deleteIcon from "../../Assets/cancel.png";
import fakeLogo from "../../Assets/fakeLogo.png";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempApiList: [],
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
    };
    if (localStorage.getItem("logUser") !== null) {
      this.state.logUser = JSON.parse(localStorage.getItem("logUser"));
    } else {
      // alert("How did you get here?, Hold on whilst i redirect you");
      this.setState({ redirect: true });
      this.props.history.push({
        pathname: "/",
      });
    }

    this.handleChange = this.handleChange.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount = () => {
    this.setState({ tempUser: [] });
    axios({
      method: "get",
      url: "http://localhost:3000/AAAUsers",
    }).then(
      (response) => {
        this.setState({ loadingIcon: "loadingIcon" });

        this.setState({
          tempApiList: response.data,
        });

        this.setState({ loadingIcon: "hideIcon" });
      },
      (error) => {
        alert("Error: " + error);
        console.log(error);
      }
    );
  };

  updateUser = (i, event) => {
    const id = event.target.value;
    const userdata = this.state.tempApiList.map((item, j) => {
      if (item.id == id) {
        axios({
          method: "PATCH",
          url: "http://localhost:3000/AAAUsers/" + id,

          data: {
            email: item.email,
            first_name: item.first_name,
            last_name: item.last_name,
            password: item.password,
            avatar: item.avatar,
          },
        })
          .then((response) => {
            this.setState({ loadingIcon: "hideIcon" });
            this.componentDidMount();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    event.preventDefault();
  };

  deleteUser(email, id, event) {
    this.setState({ loadingIcon: "loadingIcon" }); // makes loading icon show

    axios({
      method: "DELETE",
      url: "http://localhost:3000/AAAUsers/" + id, //find user by id then deletes it
    })
      .then((response) => {
        if (email === this.state.logUser.email) {
          alert("you fool, you deleted yourself");

          this.setState({ redirect: true });
        }

        this.componentDidMount();
        this.setState({ loadingIcon: "hideIcon" }); // hides loading icon
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
        this.setState({ loadingIcon: "hideIcon" });
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  findValue(id) {
    this.state.tempApiList.find((x) => x.id == id);
  }

  handleChange = (id, event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState((state) => {
      const tempApiList = state.tempApiList.map((item, j) => {
        if (item.id == id) {
          if (name == "avatar") {
            item[name] = event.target.files[0].name;
          } else {
            item[name] = value;
          }
          return item;
        } else {
          return item;
        }
      });

      return {
        tempApiList,
      };
    });
  };

  redirect() {
    this.setState({ redirect: true });
  }

  render() {
    let welcomeMessage = <h1>Hello Guest</h1>;
    if (this.state.logUser != undefined) {
      welcomeMessage = (
        <p>
          Good to see you <i>{this.state.logUser.first_name}</i>
        </p>
      );
    }

    if (this.state.redirect) {
      localStorage.clear();
      return <Redirect to="/" />;
    }

    return (
      <div className="outerApi">
        <div className="buttonOuterFlow">
          <div className="logoWelcomeContainer">
            <div className="width1001">
              <div className="welcomeMessage">{welcomeMessage}</div>
            </div>
            <div className="width100">
              <img src={fakeLogo}></img>
            </div>

            <div className="topButtonContainer">
              <div className="innerTopButtonContainer">
                <button onClick={this.addUser}>Add User</button>
                <button onClick={this.redirect}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
        <img className={this.state.loadingIcon} src={loadingIcon}></img>

        <div className="outerApilist">
          {this.state.tempApiList.map((content) => (
            <div className="tempApiListInner" key={content.id}>
              <div className="tempApiListTop">
                <div className="imgBorder">
                  <label htmlFor="file-input">
                    <img
                      src={content.avatar}
                      width="128px"
                      height="128px"
                      alt="Profile Pictures"
                    ></img>
                    <input
                      className="hideInput"
                      type="file"
                      id="file-input"
                      name="avatar"
                      accept="image/*"
                      onChange={(e) => this.handleChange(content.id, e)}
                    />
                  </label>
                </div>
                <div className="homepageOuterButtons">
                  <div className="deleteUpdatContainer">
                    <div
                      className="deleteButton"
                      onClick={(e) => {
                        this.deleteUser(content.email, content.id);
                      }}
                      value={content.id}
                    >
                      <img src={deleteIcon}></img>
                    </div>
                  </div>{" "}
                  <div className="updateUserButtonOuter">
                    <button
                      type="button"
                      onClick={(e) => {
                        this.updateUser(content.id, e);
                      }}
                      value={content.id}
                    >
                      Update user
                    </button>
                  </div>
                </div>
              </div>
              <div className="flexRow firstFlexRow">
                <div className="outerLabel">
                  <label className={"labels"}>Email:</label>
                </div>

                <div className="outerInput">
                  <input
                    className={"editableSize"}
                    name="email"
                    value={content.email}
                    placeholder={this.value}
                    onChange={(e) => {
                      this.handleChange(content.id, e);
                    }}
                  ></input>
                </div>
              </div>
              <div className="flexRow">
                <div className="outerLabel">
                  <label className={"labels"}>First Name: </label>
                </div>
                <div className="outerInput">
                  <input
                    className={"editableSize"}
                    name="first_name"
                    value={content.first_name}
                    placeholder={this.value}
                    onChange={(e) => {
                      this.handleChange(content.id, e);
                    }}
                  ></input>
                </div>
              </div>
              <div className="flexRow">
                <div className="outerLabel">
                  <label className={"labels"}>Last Name: </label>
                </div>
                <div className="outerInput">
                  <input
                    className={"editableSize"}
                    name="last_name"
                    value={content.last_name}
                    placeholder={this.value}
                    onChange={(e) => {
                      this.handleChange(content.id, e);
                    }}
                  ></input>
                </div>
              </div>
              <div className="flexRow">
                <div className="outerLabel">
                  <label className={"labels"}>Password: </label>
                </div>
                <div className="outerInput">
                  <input
                    className={"editableSize"}
                    name="password"
                    value={content.password}
                    placeholder={this.value}
                    onChange={(e) => {
                      this.handleChange(content.id, e);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Homepage;
