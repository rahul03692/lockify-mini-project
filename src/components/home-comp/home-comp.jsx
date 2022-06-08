import React from "react";

//import { Redirect } from "react-router";
import { auth, db } from "../../services/firebase";
import { withRouter } from "react-router-dom";
import Lists from "../lock-lists/lock-lists-comp";
import "./home-styles.css";
import { CircularProgress } from "@mui/material";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  LogOut = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.clear();
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  getData = async () => {
    const array = [];
    const userUid = JSON.parse(localStorage.getItem("userData")).uid;
    db.collection(`users/${userUid}/locks`).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        console.log(change.doc.data());
        array.push({ data: change.doc.data(), uid: change.doc.id });
      });
      this.setState({ data: array, loaded: true });
    });
  };

  render() {
    const data = this.state.data;
    const userEmail = JSON.parse(localStorage.getItem("userData")).email;

    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <div style={{ marginLeft: 10 + "px" }}>
            <a href="/" class="navbar-brand">
              SIMPLIFY
            </a>
          </div>
          <button className="btn btn-warning" onClick={this.LogOut}>
            LogOut
          </button>
        </nav>
        <div className="jumbotron jumbotron-fluid wel">
          <div className="container">
            <h3 className="display-4">WELCOME BACK</h3>
            <h4 className="lead">{userEmail}</h4>
            <h3 className="heading">Your Devices </h3>
            <hr class="my-4"></hr>
            <div className="list">
              <ul>
                {this.state.loaded ? (
                  data.map((item) => (
                    
                      <Lists
                        key={item.uid}
                        name={item.data.name}
                        isLocked={item.data.isLocked}
                        uid={item.uid}
                        nodeId={item.data.nodeId}
                        deviceId={item.data.deviceId}
                        lockCode={item.data.lockCode}
                      />
                    
                  ))
                ) : (
                  <CircularProgress style={{ margin: "auto" }} />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
