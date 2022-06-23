import React from "react";
import "./lock-lists-styles.css";

import { useHistory } from "react-router-dom";
//import LockUnlock from "../../pages/lock-unlock-page/lock-unlock-page-comp";

//import { Switch,Route } from "react-router";

const Lists = (props) => {
  //console.log(props.isLocked);
  const history = useHistory();
  const handleClick = () => {
    // history.push("/locks", {
    //   name: props.name,
    //   isLocked: props.isLocked,
    //   uid: props.uid,
    //   nodeId: props.nodeId,
    //   deviceId: props.deviceId,
    // });

    history.push({
      pathname: "/locks",
      state: {
        name: props.name,
        isLocked: props.isLocked,
        uid: props.uid,
        nodeId: props.nodeId,
        deviceId: props.deviceId,
        lockCode: props.lockCode,
      },
    });
  };

  console.log(props.lockCode);
  return (
    <li>
    <div className="list-tiles" onClick={handleClick}>
      <ul className="list-group">
        <li className="list-group-item d-flex dir justify-content-between align-items-center">
          {props.lockCode[2] === "1" ? (
            props.isLocked === true ? (
              <img
                src="https://firebasestorage.googleapis.com/v0/b/dairyweb-3dca5.appspot.com/o/fan.gif?alt=media&token=6cc8b377-cd73-4b7b-b24d-ded4fdd6b880"
                alt="fan on"
              ></img>
            ) : (
              <img
                src="https://firebasestorage.googleapis.com/v0/b/dairyweb-3dca5.appspot.com/o/Screenshot%202022-06-14%20233902.png?alt=media&token=36935b04-cfaf-40a7-972b-73d3f9c57f4e"
                alt="fan off"
              ></img>
            )
          ) : (props.lockCode[2] === "2" ? (props.isLocked === true ? (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/dairyweb-3dca5.appspot.com/o/lighton.jpg?alt=media&token=201703ce-326a-40f0-8250-5ddf180b7896"
              alt="light on"
            ></img>
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/dairyweb-3dca5.appspot.com/o/lightoff.png?alt=media&token=f8d6f84e-40b8-470c-aa6f-94c2ae42f57d"
              alt="light off"
            ></img>
          )) : (
            (props.isLocked === true ? (
              <img src="https://firebasestorage.googleapis.com/v0/b/dairyweb-3dca5.appspot.com/o/door_closed.png?alt=media&token=c9045804-a148-438a-85e2-b965c8f84bc5" alt="door lock" />
            ) : (
              <img src="https://firebasestorage.googleapis.com/v0/b/dairyweb-3dca5.appspot.com/o/door_open.png?alt=media&token=1459fbe0-332d-422a-a799-f032cac4b75b" alt="door unlocked" />
            ))
          ))}
          <h4>{props.name}</h4>
          {props.isLocked === true ? (
            <span className="badge bg-danger rounded-pill">ON</span>
          ) : (
            <span className="badge bg-primary rounded-pill">OFF</span>
          )}
        </li>
      </ul>
    </div>
    </li>
  );
};

export default Lists;
