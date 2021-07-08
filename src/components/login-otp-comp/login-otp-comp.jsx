import React, { useState } from "react";
import firebase from 'firebase/app';
import "firebase/auth";
import { withRouter } from "react-router";

const LoginWithOtp = (props) => {
  const [phoneno, setPhoneNumber] = useState("");
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
    console.log(phoneNumber);

    configureRecaptcha();
    console.log("hey");
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has sent");
        e.target.value="";
        setPhoneNumber("");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("error its me");
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
        const user = result.user;
        console.log(user);
        setOtp("");
        e.target.value="";

        props.history.push("/");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error.message);
      });
  };

  return (
    <div>
      <form onSubmit={onSignInSubmit}>
        <input
          type="number"
          name="phoneno"
          placeholder="Enter Mobile number"
          required
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default withRouter(LoginWithOtp);