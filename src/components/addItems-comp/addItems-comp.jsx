import React from "react";

import { auth, db } from "../../firebase/firebase";

import "./addItems-styles.css";

class AddItems extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      isLocked: false,
      lockCode: "",
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
    const userUid = JSON.parse(localStorage.getItem("userData")).uid;

    db.collection(`users/${userUid}/locks`)
      .add({
        name: event.target.name.value,
        isLocked: true,
        lockCode: event.target.lockCode.value,
      })
      .then(() => {
        this.setState({ name: "", isLocked: false, lockCode: "" });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="additems-top">
        <div className="additems">
          <h2>Add Lock Configuration</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter lock name"
              onChange={this.handleChange}
              required
              value={this.state.name}
            />
            <label htmlFor="id">Lock Code</label>
            <input
              type="text"
              name="lockCode"
              id="lockCode"
              placeholder="lock code "
              onChange={this.handleChange}
              value={this.state.lockCode}
            />
            {/* <label htmlFor="isLocked">isLocked<input
              type="checkbox"
              name="isLocked"
              id="isLocked"
              value={this.state.isLocked}
              onChange={this.handle}
            />
            </label> */}

            <div className="buttons-class">
              <button className="btn btn-primary" type="submit">
                Add New Lock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddItems;
