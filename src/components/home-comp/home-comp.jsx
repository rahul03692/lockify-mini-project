import React from "react";

import { db } from "../../firebase/firebase";
import Lists from "../lock-lists/lock-lists-comp";

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

  getData = async () => {
      const array=[];
      db.collection("locks")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          array.push(change.doc.data());
        });
        this.setState({data:array});
      });
  };

  render() {
    
    const data=this.state.data;

    return (
      <div className="home-page">
        <h1>Locks List</h1>
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
