import React from "react";

import { Link } from "react-router-dom";

//import lock from './lock.jpg';

import './landing-page-styles.css';



const LandingPage = () => {

    const userData = JSON.parse(localStorage.getItem("userData"));

    return (
        <div className="bg-color">
            <div className="bg"></div>
            <div className="landing-page">

                <div className="main-center">

                    <div className="link-class">
                        
                        {
                            userData ?
                                <div class="jumbotron">

                                    <div className="bard display-4">
                                        LOCKIFY
                                    </div>
                                    <p className="lead para">Smart and Secure Locking System.</p>
                                    {/* <hr class="my-4" /> */}
                                    {/* <p className="para">Easy to handle, Secure Application</p> */}
                                    {
                                        userData.validOtp ?
                                            <Link to="/home" className="link"> <button className="btn btn-light  btn-lg">SIGNIN</button></Link>
                                            :
                                            <Link to="/sign-in" className="link"> <button className="btn btn-light  btn-lg">SIGNIN</button></Link>

                                    }
                                    <Link to="/sign-up" className="link"> <button className="btn btn-warning  btn-lg">SIGNUP</button></Link>
                                </div>
                                :
                                <div class="jumbotron">

                                    <div className="bard display-4">
                                        LOCKIFY
                                    </div>
                                    <p className="lead para">Smart and Secure Locking System.</p>
                                    {/* <hr class="my-4" /> */}
                                    {/* <p className="para">Easy to handle, Secure Application</p> */}
                                    <Link to="/sign-in" className="link"> <button className="btn btn-light  btn-lg">SIGNIN</button></Link>

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
