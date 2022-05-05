import React from "react";
import { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

//import lock from './lock.jpg';

import "./landing-page-styles.css";

const LandingPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  let history = useHistory();
  useEffect(() => {
    if (userData) {
      history.push("/home");
    }
  }, []);

  return (
    <div className="bg-color">
      <div className="bg"></div>
      <div className="landing-page">
        <div className="main-center">
          <div className="link-class">
            <div class="jumbotron">
              <div className="bard display-4">S!MPL!FY</div>
              <p className="lead para"><b>Simplifying your Lifes.</b></p>
              <Link to="/sign-in" className="link">
                <button className="btn btn-light  btn-lg">SIGNIN</button>
              </Link>
              <Link to="/sign-up" className="link">
                <button className="btn btn-warning  btn-lg">SIGNUP</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
