import React from "react";
import { auth, db } from "../../services/firebase";

import lock from "./lock-big.png";
import unlock from "./unlock-big.png";
import CircularProgress from "@mui/material/CircularProgress";
import "./lock-unlock-page-styles.css";
import { LockService } from "../../services/lockService";

class LockUnlock extends React.Component {
  // console.log(name,isLocked);

  constructor() {
    super();

    this.state = {
      name: "",
      isLocked: "",
      state: "idle",
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
    const userUid = JSON.parse(localStorage.getItem("userData")).uid;
    if (this.state.isLocked) {
      LockService.getInstance().openLock();
    } else {
      LockService.getInstance().closeLock();
    }

    db.collection(`users/${userUid}/locks`)
      .doc(this.props.location.state.uid)
      .update({
        isLocked: !this.state.isLocked,
      })
      .then(() => {
        this.setState({ isLocked: !this.state.isLocked });
        this.setState({ state: "idle" });
      })
      .catch((err) => console.log(err.message));
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
          {this.state.state == "idle" ? (
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
