import React from "react";

import { db, auth, Provider } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import googleimg from "./google-img.png";
import "./sign-in-sign-out-styles.css";

class SignInSignOut extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        if (resp.user) {
          const user = {
            email: resp.user.email,
            uid: resp.user.uid,
          };

          this.setState({ email: "", password: "" });
          localStorage.setItem("userData", JSON.stringify(user));
          this.props.history.push("/home");
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };

  SignInWithGoogle = () => {
    Provider.setCustomParameters({ prompt: "select_account" });
    auth
      .signInWithPopup(Provider)
      .then((result) => {
        const user = {
          email: result.user.email,
          uid: result.user.uid,
        };

        localStorage.setItem("userData", JSON.stringify(user));
        this.props.history.push("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return <div>{this.props.history.push("/")}</div>;
    } else {
      return (
        <div className="body-class form-container">
          <div>
            <h2>
              LOGIN <span>here</span>
            </h2>
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
                <button className="btn btn-primary" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="google-div btn btn-outline-info">
            <img
              src={googleimg}
              alt="google-img"
              onClick={this.SignInWithGoogle}
              className="google-img"
            />
          </div>
          <span>
            Dont have account?
            <Link to="/sign-up" class="link">
              signup here
            </Link>
          </span>
        </div>
      );
    }
  }
}

export default SignInSignOut;
