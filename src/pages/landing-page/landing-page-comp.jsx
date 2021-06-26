import React from "react";

import { Link } from "react-router-dom";
import lock from './lock.jpg';

import './landing-page-styles.css';



const LandingPage = ()=>{

    const userData = JSON.parse(localStorage.getItem("userData"));

    return(
        <div className="bg-color">
            <div className="landing-page">
            <img src={lock} alt="lock" className="lock-img"/>
            <div className="main-center">
                <h1>Lockify</h1>
                <div className="link-class">
                    {
                        userData?
                        <div class="signin-signup">
                            <div className="sign-in">
                                <Link to="/home" class="link"> Sign In</Link>
                            </div>
                            <div className="sign-up">
                                <Link to="/sign-up" class="link"> Sign Up</Link>
                            </div>
                        </div>
                        :<div class="signin-signup">
                            <div className="sign-in">
                                <Link to="/sign-in" class="link"> Sign In</Link>
                            </div>
                            <div className="sign-up">
                                <Link to="/sign-up" class="link"> Sign Up</Link>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
        </div>
    );
}

export default LandingPage;
