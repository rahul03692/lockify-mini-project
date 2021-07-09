import React from "react";

import "./signup-styles.css";
import { Link } from "react-router-dom";

import { auth ,db} from "../../firebase/firebase";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const user = {
          email: resp.user.email,
          uid: resp.user.uid,
        };

        this.setState({ email: "", password: "" });
        localStorage.setItem("userData", JSON.stringify(user));


        //creating user with uid
        const locksRef=db.doc(`users/${user.uid}`);
        locksRef.get().then((ss)=>{
          locksRef.collection("locks");
          this.props.history.push("/home");
        });
      

      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });

  };

  render() {
    return (
      <div className="body-class">
        
        <div>
          <h2>SIGNUP <span>here</span></h2>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              //placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              //placeholder="password"
              onChange={this.handleChange}
              value={this.state.password}
            />

            <div className="buttons-class">
              <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>

          </form>

        </div>
        <span>Already have account?  <Link to="/sign-in" class="link"> Login here</Link></span>
        
      </div>
    );
  }
}

export default SignUp;