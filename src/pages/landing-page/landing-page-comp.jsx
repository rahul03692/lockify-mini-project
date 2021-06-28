import React from "react";

import { Link } from "react-router-dom";

//import lock from './lock.jpg';

import './landing-page-styles.css';



const LandingPage = ()=>{

    const userData = JSON.parse(localStorage.getItem("userData"));

    return(
        <div className="bg-color">
            <div className="bg"></div>
            <div className="landing-page">
           
            <div className="main-center">
                    <div className="card">
                        <h1>LOCKIFY</h1>
                     </div>
                <div className="link-class">
                    {
                            userData ?
                                
                                <div class="jumbotron">
                                    <h1 className="display-4">WELCOME TO</h1>
                                    <p className="lead para">Secure and Smart Locking System.</p>
                                    <hr class="my-4" />
                                    <p className="para">Easy to handle, Secure Application,Robust performance</p>
                                    <Link to="/home" className="link"> <button className="btn btn-warning  btn-lg">SIGNIN</button></Link>
                                    <Link to="/sign-up" className="link"> <button className="btn btn-warning  btn-lg">SIGNUP</button></Link>
                                </div>
                                :
                                <div class="jumbotron">
                                    <h1 className="display-4">WELCOME TO</h1>
                                    <p className="lead para">Secure and Smart Locking System.</p>
                                    <hr class="my-4"/>
                                        <p className="para">Easy to handle, Secure Application,Robust performance</p>
                                    <Link to="/sign-in" className="link"> <button className="btn btn-warning  btn-lg">SIGNIN</button></Link>
                                    <Link to="/sign-up" className="link"> <button className="btn btn-warning  btn-lg">SIGNUP</button></Link>
                                </div>
                            
                    }

                </div>
            </div>
        </div>
        </div>
    );
}

export default LandingPage;
