import React from "react";
import "./lock-lists-styles.css";

const Lists =(props)=>{
    console.log(props.isLocked);
    return (
      
        <div className="list-tiles">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <h2>{props.name}</h2>
                    {props.isLocked === "true" ? <span className="badge bg-primary rounded-pill">Locked</span> : <span className="badge bg-danger rounded-pill">Not Locked</span>}
                    
                </li>
                </ul> 
        </div>
    );
}

export default Lists;
