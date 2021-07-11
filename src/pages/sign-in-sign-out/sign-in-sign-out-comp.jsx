import React from "react";

import { db, auth, Provider } from "../../firebase/firebase";
import { Link } from "react-router-dom";

import "./sign-in-sign-out-styles.css";

class SignInSignOut extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  // const {setUser}=this.props;

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        const user = {
          email: resp.user.email,
          uid: resp.user.uid,
        };

        this.setState({ email: "", password: "" });
        // localStorage.setItem("userData", JSON.stringify(user));
        //console.log(localStorage.getItem("userData"));

        db.doc(`users/${user.uid}`)
          .get()
          .then((res) => {
            this.props.history.push({
              pathname: "/loginotp",
              state: {
                phoneno: res.data().phoneno,
                email: user.email,
                uid: user.uid,
              },
            });
          })
          .catch((err) => console.log(err.message));
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
          validOtp: true,
          phoneno: null,
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
          <button className="btn btn-danger" onClick={this.SignInWithGoogle}>
            Google Sign In
          </button>
          <span>
            Dont have account?{" "}
            <Link to="/sign-up" class="link">
              {" "}
              signup here
            </Link>
          </span>
        </div>
      );
    }
  }
}

// const mapDispatchToProps=(dispatch)=>({
//   setUser:item => dispatch(setCurrentUser(item)),
// });

export default SignInSignOut;
