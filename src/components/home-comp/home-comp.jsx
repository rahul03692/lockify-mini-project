import React from "react";

//import { Redirect } from "react-router";

import { auth, db } from "../../firebase/firebase";

import { withRouter } from "react-router-dom";

import Lists from "../lock-lists/lock-lists-comp";
import './home-styles.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  LogOut = () => {
    
    auth.signOut().then(()=>{
      localStorage.clear();
      this.props.history.push("/");
    }).catch(err=>{
      console.log(err.message);
    });

  }
  getData = async () => {
      const array=[];
      
      const userUid=JSON.parse(localStorage.getItem("userData")).uid;

      db.collection(`users/${userUid}/locks`)
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          array.push({data:change.doc.data(),uid:change.doc.id});
        });
        
        this.setState({data:array});
      });
  };

  render() {
    
    const data=this.state.data;
    const userEmail = JSON.parse(localStorage.getItem("userData")).email;

    return (
      <div className="home-page">
        <h1>Locks List</h1>
        <h6 className="logged-in-email">Logged in as:  {userEmail} </h6>
        <div className="logout">
          <button onClick={this.LogOut}>LogOut</button>
        </div>
        <div className="list">
          {data.map((item) => (
            <Lists key={item.uid} name={item.data.name} isLocked={item.data.isLocked} uid={item.uid} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
