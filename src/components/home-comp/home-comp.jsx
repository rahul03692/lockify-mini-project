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
      <div >

        <nav class="navbar navbar-light bg-light">
          <div style={{marginLeft:10 +'px'}}>
            <a class="navbar-brand">  LOCKIFY</a>
         </div>
         
            <button className="btn btn-warning" onClick={this.LogOut}>LogOut</button>
        </nav>
        
        
          <div className="jumbotron jumbotron-fluid wel">
            <div className="container">
              <h3 className="display-4">WELCOME back</h3>
              <h4 className="lead">{userEmail}</h4>
            <h3 className="heading">Your lock list </h3>
            <hr class="my-4"></hr>
            <div className="list">
              {data.map((item) => (
                <Lists key={item.uid} name={item.data.name} isLocked={item.data.isLocked} uid={item.uid} />
              ))}
            </div>
            </div>
          </div>      
      </div>
    );
  }
}

export default withRouter(Home);
