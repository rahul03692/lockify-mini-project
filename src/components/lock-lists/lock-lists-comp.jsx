import React from "react";
import "./lock-lists-styles.css";

import { useHistory } from "react-router-dom";
//import LockUnlock from "../../pages/lock-unlock-page/lock-unlock-page-comp";

//import { Switch,Route } from "react-router";

const Lists = (props) => {
  
  console.log(props.isLocked)
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: "/locks",
      state: {
        name: props.name,
        isLocked: props.isLocked,
        uid: props.uid,
      },
    });
  };

  return (
    <div className="list-tiles" onClick={handleClick}>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <h4>{props.name}</h4>
          {props.isLocked === true ? (
            <span className="badge bg-primary rounded-pill">Locked</span>
          ) : (
            <span className="badge bg-danger rounded-pill">Open</span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Lists;
