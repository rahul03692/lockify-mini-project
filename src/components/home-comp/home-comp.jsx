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
      try{
        const snapshot=await db.collection("locks").onSnapshot();
        console.log(snapshot)
        snapshot.forEach(doc=>{
            array.push(doc.data());
        });

        console.log(array);
        this.setState({data:array});
      }
      catch(err){
          console.log(err.message);
      }
  };

  render() {
    const data = this.state.data?this.state.data:null;

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
