import React from "react";
import "./lock-lists-styles.css";

const Lists = (props) => {
  console.log(props.isLocked);
  return (
    <div className="list-tiles">
      <h1>{props.name}</h1>
      <span>{props.isLocked === "true" ? "Locked" : "Not Locked"}</span>
    </div>
  );
};

export default Lists;
