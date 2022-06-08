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
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {props.lockCode[2] === "1" ? (
            props.isLocked === true ? (
              <img
                src="https://youraircomfort.com/wp-content/uploads/2017/07/fan-gif.gif"
                alt="fan on"
              ></img>
            ) : (
              <img
                src="https://cdn-icons.flaticon.com/png/128/545/premium/545932.png?token=exp=1654715183~hmac=64b64dd764201bfdd748fc1477827306"
                alt="fan off"
              ></img>
            )
          ) : (props.lockCode[2] === "2" ? (props.isLocked === true ? (
            <img
              src="https://cdn-icons.flaticon.com/png/512/2988/premium/2988036.png?token=exp=1654715438~hmac=854f223c09b842a4a6231d478344c3b0"
              alt="light on"
            ></img>
          ) : (
            <img
              src="https://cdn-icons.flaticon.com/png/512/2987/premium/2987972.png?token=exp=1654715207~hmac=a5d65b34958b405f211774424c2f8ddf"
              alt="light off"
            ></img>
          )) : (
            (props.isLocked === true ? (
              <img src="https://cdn-icons.flaticon.com/png/128/2607/premium/2607189.png?token=exp=1654718169~hmac=9407c58a65fd9956ec4079707cbcccb2" alt="door lock" />
            ) : (
              <img src="https://cdn-icons.flaticon.com/png/128/3944/premium/3944622.png?token=exp=1654718169~hmac=f6625c6bb13787354e9a6c45f66567af" alt="door unlocked" />
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
