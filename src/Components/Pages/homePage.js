import React from "react";
import axios from "axios";
import loadingIcon from "../../Assets/yy3.gif";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: [],
      loadingIcon: "hideIcon",
      tempApi: "",
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      avatar: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.myRef = React.createRef();
  }

  updateUser = (event) => {
    console.log(event.target.value);

    //   axios({
    //     method: 'PATCH',
    //     url: 'http://localhost:3000/AAAUsers/'+ event.target.value,

    //     data: {
    //       "email": event.target.email,
    //       "first_name": fname,
    //       "last_name": lname,
    //       "password": pwd,
    //       "avatar": img
    //   }
    //   })

    //   .then(response => {
    //     this.componentDidMount()
    //     this.setState({loadingIcon: 'hideIcon'})
    //     console.log(response)
    // })
    // .catch(error => {
    //     console.log(error.response)
    // });
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(target + "-----" + value + "-----" + name);

    this.setState({
      [name]: value,
    });
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
    // React.useEffect(() => {
    //   localStorage.setItem('myValueInLocalStorage', value);
    // }, [value]);

    // {this.state.apiList.map((apiList, key) =>

    // this.state.email = apiList.email
    console.log(this.state.tempApi);
    //     )}
    return (
      <div className="outerApi">
        <div className="buttonOuterFlow">
          <button onClick={this.addUser}>Add User</button>
          <Link id="signOut" to="/">
            Sign Out
          </Link>
        </div>

        <img
          className={this.state.loadingIcon}
          src={loadingIcon}
          width="300px"
          height="300px"
          alt="Profile Pictures"
        ></img>

        {this.state.apiList.map((content) => (
          <div
            className={"apiListInner"}
            ref={this.myRef}
            //  onBlur={(e)=> this.setState({tempApi:e.currentTarget.textContent})}
          >
            <div className={"flexRow"}>
              <p className={"flexcollumn"}>Email:</p>

              <div
                className={"editableSize"}
                onBlur={(e) => console.log(e.target.id)}
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
                onBlur={(e) =>
                  this.setState({ tempApi: e.currentTarget.textContent })
                }
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
              <button onClick={this.updateUser} value={content.id}>
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

// create
// PerformanceResourceTiming,
// condition rendiering
//  hooks

// pass value route to another , redirect doc, pass value via redirect
//add bootstrap, use grid use template
//html required
