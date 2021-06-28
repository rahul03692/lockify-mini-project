import React from "react";
import { Redirect } from "react-router";

import { auth, db } from "../../firebase/firebase";

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
    localStorage.clear();

    <Redirect to="/" />
    auth.signOut().then(()=>{
      
      <Redirect to="/" />
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
          console.log(change.doc.data());
          array.push(change.doc.data());
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
            <Lists name={item.name} isLocked={item.isLocked} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
