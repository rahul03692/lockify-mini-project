import React from "react";
import "./lock-lists-styles.css";

import { useHistory } from "react-router-dom";
//import LockUnlock from "../../pages/lock-unlock-page/lock-unlock-page-comp";

//import { Switch,Route } from "react-router";

const Lists = (props) => {
  const history = useHistory();
  const handleClick = () =>{
    history.push({
      pathname:'/locks',
      state:{
        name:props.name,
        isLocked:props.isLocked,
        uid:props.uid
      }
    });
  }

  return (
    <div className="list-tiles" onClick={handleClick} >
      <h1>{props.name}</h1>
      <span>{props.isLocked ? "Locked" : "Not Locked"}</span>
    </div>
  );
};

export default Lists;
