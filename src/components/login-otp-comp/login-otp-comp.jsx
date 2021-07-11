import React, { useState } from "react";
import firebase from 'firebase/app';
import "firebase/auth";
import { withRouter } from "react-router";

const LoginWithOtp = (props) => {
  console.log(props.location.state.phoneno);
  const [phoneno, setPhoneNumber] = useState(props.location.state.phoneno);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    if (name === "phoneno") {
      setPhoneNumber(value);
    } else {
      setOtp(value);
    }
  };

  const configureRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumber = "+91" + phoneno;
    configureRecaptcha();
  
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error.message);
      });
  };

  const otpSubmit = (e) => {
      e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        //const user = result.user;
        setOtp("");
        setPhoneNumber("");
        e.target.value="";
        
        props.history.push("/home");
        // ...
      })
      .catch((error) => {
        alert("INVALID OTP");

        setOtp("");
        console.log(error.message);
      });
  };

  return (
    <div>
      <h2>Two Factor Authentication</h2>
      <form onSubmit={onSignInSubmit}>
        <input disabled
          type="number"
          name="phoneno"
          placeholder="Enter Mobile number"
          value={phoneno}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={otpSubmit}>
        <div id="sign-in-button"></div>
        <input
          type="password"
          name="otp"
          placeholder="Enter Otp"
          required
          value={otp}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default withRouter(LoginWithOtp);