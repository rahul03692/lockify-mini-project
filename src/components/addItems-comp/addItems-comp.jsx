import React from "react";

import { db } from "../../firebase/firebase";
import "./addItems-styles.css";

class AddItems extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      isLocked: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handle = (event) => {
    this.setState({ isLocked: event.target.checked });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    db.collection("locks")
      .add({
        name: event.target.name.value,
        isLocked: event.target.isLocked.value,
      })
      .then(() => {
        console.log("successful");
        this.setState({name:"",isLocked:false});
        event.target.isLocked.checked=false;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="additems-top">
        <div className="additems">
          <h1>Add Lock Configuration</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              //placeholder="email"
              onChange={this.handleChange}
              value={this.state.name}
            />

            <label htmlFor="isLocked">isLocked</label>
            <input
              type="checkbox"
              name="isLocked"
              id="isLocked"
              value={this.state.isLocked}
              onChange={this.handle}
            />

            <div className="buttons-class">
              <button type="submit">Add Item</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddItems;
