import React from "react";

import { Link } from "react-router-dom";
import lock from './lock.jpg';

import './landing-page-styles.css';


const LandingPage = ()=>{
    return(
        <div className="bg-color">
            <div className="landing-page">
            <img src={lock} alt="lock" className="lock-img"/>
            <div className="main-center">
                <h1>Lockify</h1>
                <div className="link-class">
                    <Link to="/sign-in" class="link"> Sign In</Link>
                </div>
            </div>
        </div>
        </div>
    );
}

export default LandingPage;
