import React from "react";
import { db } from "../../firebase/firebase";

import lock from "./lock-big.png";
import unlock from "./unlock-big.png";

import "./lock-unlock-page-styles.css";

class LockUnlock extends React.Component {
  // console.log(name,isLocked);

  constructor() {
    super();

    this.state = {
        name:"",
        isLocked: "",
    };
  }

  componentDidMount(){
      const {name,isLocked}=this.props.location.state;
      this.setState({name:name,isLocked:isLocked});
  }

  handleClick = () => {
    const userUid = JSON.parse(localStorage.getItem("userData")).uid;
    db.collection(`users/${userUid}/locks`)
      .doc(this.props.location.state.uid)
      .update({
        isLocked: !this.state.isLocked,
      })
      .then(() => {
        this.setState({ isLocked: !this.state.isLocked });
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    const {name,isLocked}=this.state;
    return (
      <div className="lock-unlock">
        <h1 style={{color:"black"}}>{name}</h1>
        {isLocked ? (
          <div className="img-div locked">
            <img src={lock} alt="lock" onClick={this.handleClick} className="img" />
            {/* <h2>{isLocked==="true"?"Locked":"Unlocked"}</h2> */}
          </div>
        ) : (
          <div className="img-div unlocked">
            <img src={unlock} alt="unlock" onClick={this.handleClick} className="img" />
            {/* <h2>{isLocked==="true"?"Locked":"Unlocked"}</h2> */}
          </div>
        )}
      </div>
    );
  }
}

export default LockUnlock;
