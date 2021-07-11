import React, { useState } from "react";
import firebase from 'firebase/app';
import "firebase/auth";
import { withRouter } from "react-router";
import './otp.css'
const LoginWithOtp = (props) => {
  console.log(props.location.state.phoneno);
  const [phoneno, setPhoneNumber] = useState(props.location.state.phoneno);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [showPhone, setShowPhone] = useState(true);
  const [showSpinner,setShowSpinner]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp(value);
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

    setShowSpinner(true);
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
        setMsg("OTP has sent");
        setShowSpinner(false);
        setShowPhone(false);

        console.log("OTP has sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        setShowPhone(true)
        console.log("error its me");
        console.log(error.message);
        setMsg(error.message);
      });
  };

  const otpSubmit = (e) => {
    setShowSpinner(true);
      e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        //const user = result.user;
        
        e.target.value = "";
        const userData={
          'phoneno': phoneno,
          'validOtp': true,
          'email': props.location.state.email,
          'uid': props.location.state.uid,
        }
          localStorage.setItem('userData',JSON.stringify(userData));
        setOtp("");
        setPhoneNumber("");
        setShowSpinner(false);
        props.history.push("/home");
        // ...
      })
      .catch((error) => {
        alert("INVALID OTP");
        const userData = {
          'phoneno': phoneno,
          'validOtp': false,
          'email': props.location.state.email,
          'uid': props.location.state.uid,
        }
        localStorage.setItem('userData', JSON.stringify(userData));
        setOtp("");
        console.log(error.message);
      });
  };

  return (
    <div className="body-class">
      <pre>
        
      </pre>
      <pre>

      </pre>
      <h2>Two Factor Authentication</h2>
     

      {
          showPhone ?
          <form onSubmit={onSignInSubmit}>
            <div id="sign-in-button"></div>
          <input disabled
            type="number"
            name="phoneno"
            placeholder="Enter Mobile number"
            value={phoneno}
            required
          />
            {showSpinner ?
              <div class="spinner-border text-warning" role="status">
                {/* <span class="sr-only">Loading...</span> */}
              </div>
              :
              <button className="btn btn-warning" type="submit">Submit</button>
            }
          <p>{msg}</p>
          </form> :
          
          <form onSubmit={otpSubmit}>
            <p>{msg}</p>
            <input
              type="password"
              name="otp"
              placeholder="Enter Otp"
              required
              value={otp}
              onChange={handleChange}
            />
            {showSpinner ?
              <div class="spinner-border text-warning" role="status">
                {/* <span class="sr-only">Loading...</span> */}
              </div>
              :
              <button className="btn btn-primary" type="submit">Submit</button>
            }
          </form>
          
      }      
    </div>
  );
};

export default withRouter(LoginWithOtp);