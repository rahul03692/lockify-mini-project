import React from "react";
import { auth, db } from "../../services/firebase";

import lock from "./lock-big.png";
import unlock from "./unlock-big.png";
import CircularProgress from "@mui/material/CircularProgress";
import "./lock-unlock-page-styles.css";
import { LockService } from "../../services/lockService";

class LockUnlock extends React.Component {
  socketUrl = "wss://door-unlock-test.herokuapp.com";
  ws = {};
  userUid;

  // states :
  // not connected : socket is establishing
  // connected

  constructor() {
    super();
    this.userUid = JSON.parse(localStorage.getItem("userData")).uid;
    this.state = {
      name: "",
      isLocked: "",
      state: "notConnected",
    };

    var ws = new WebSocket("wss://door-unlock-test.herokuapp.com");
    ws.onopen = () => {
      this.setState({ state: "connected" });
      this.ws = ws;
    };

    ws.onmessage = (msg) => {
      var message = JSON.parse(msg.data);
      var status = message.lockStatus;
      db.collection(`users/${this.userUid}/locks`)
        .doc(this.props.location.state.uid)
        .update({
          isLocked: status !== "open",
        })
        .then(() => {
          this.setState({ state: "connected", isLocked: status !== "open" });
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
    if (this.state.isLocked) {
      this.ws.send(JSON.stringify({ command: "open" }));
    } else {
      this.ws.send(JSON.stringify({ command: "close" }));
    }
  };

  render() {
    const { name, isLocked } = this.state;
    return (
      <>
        <nav class="navbar navbar-light bg-light">
          <div style={{ marginLeft: 10 + "px" }}>
            <a href="/home" class="navbar-brand">
              LOCKIFY
            </a>
          </div>
          <button className="btn btn-warning" onClick={this.LogOut}>
            LogOut
          </button>
        </nav>
        <div className="lock-unlock">
          <h1 style={{ color: "black" }}>{name}</h1>
          <h5>Click to {isLocked ? "Unlock" : "Lock"}</h5>
          {this.state.state == "connected" ? (
            <>
              {isLocked ? (
                <div className="img-div locked" onClick={this.handleClick}>
                  <img src={lock} alt="lock" className="img" />
                  {/* <h2>{isLocked==="true"?"Locked":"Unlocked"}</h2> */}
                </div>
              ) : (
                <div className="img-div unlocked" onClick={this.handleClick}>
                  <img src={unlock} alt="unlock" className="img" />
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
