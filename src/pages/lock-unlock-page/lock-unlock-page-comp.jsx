import React from "react";
import { auth, db } from "../../services/firebase";

//import lock from "./lock-big.png";
//import unlock from "./unlock-big.png";

import on from "./blue.png";
import off from "./red.png";

import CircularProgress from "@mui/material/CircularProgress";
import "./lock-unlock-page-styles.css";
import { useLocation } from "react-router-dom";

class LockUnlock extends React.Component {
  socketUrl = "wss://door-unlock-test.herokuapp.com";
  ws = {};
  userUid;

  // states :
  // not connected : socket is establishing
  // connected

  constructor(props) {
    super();
    this.userUid = JSON.parse(localStorage.getItem("userData")).uid;
    // location = useLocation();
    this.state = {
      ...props.location.state,
      state: "notConnected",
    };

    var ws = new WebSocket("wss://door-unlock-test.herokuapp.com");
    // var ws = new WebSocket("ws://192.168.47.191:3080/");
    ws.onopen = () => {
      this.setState({ state: "connected" });
      this.ws = ws;
    };

    ws.onmessage = (msg) => {
      var message = JSON.parse(msg.data);
      var status = message.deviceStatus;
      db.collection(`users/${this.userUid}/locks`)
        .doc(this.props.location.state.uid)
        .update({
          isLocked: status !== "on",
        })
        .then(() => {
          this.setState({ state: "connected", isLocked: status !== "on" });
        })
        .catch((err) => console.log(err.message));
    };

    ws.onclose = () => {
      this.setState({ state: "notConnected" });
    };
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

  componentDidMount() {
    const { name, isLocked } = this.props.location.state;
    this.setState({ name: name, isLocked: isLocked });
  }

  handleClick = () => {
    this.setState({ state: "inProgress" });
    //console.log(`${this.state.nodeId}${this.state.deviceId}1`);
    if (this.state.isLocked) {
      this.ws.send(
        JSON.stringify({
          command: `${this.state.nodeId}${this.state.deviceId}1`,
        })
      );
    } else {
      this.ws.send(
        JSON.stringify({
          command: `${this.state.nodeId}${this.state.deviceId}0`,
        })
      );
    }
  };

  render() {
    const { name, isLocked } = this.state;
    console.log(name, isLocked, this.state.state);
    return (
      <>
        <nav class="navbar navbar-light bg-light">
          <div style={{ marginLeft: 10 + "px" }}>
            <a href="/home" class="navbar-brand">
              SIMPLIFY
            </a>
          </div>
          <button className="btn btn-warning" onClick={this.LogOut}>
            LogOut
          </button>
        </nav>
        <div className="lock-unlock">
          <h1 style={{ color: "black" }}>{name}</h1>
          <h5>Click to {isLocked ? "Off" : "On"}</h5>
          {this.state.state == "connected" ? (
            <>
              {isLocked ? (
                <div className="img-div unlocked" onClick={this.handleClick}>
                  <img src={on} alt="lock" className="img" />
                  {/* <h2>{isLocked==="true"?"Locked":"Unlocked"}</h2> */}
                </div>
              ) : (
                <div className="img-div locked" onClick={this.handleClick}>
                  <img src={off} alt="unlock" className="img" />
                  {/* <h2>{isLocked==="true"?"Locked":"Unlocked"}</h2> */}
                </div>
              )}
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </>
    );
  }
}

export default LockUnlock;
