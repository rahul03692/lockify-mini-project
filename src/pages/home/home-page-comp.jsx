import React from "react";
import Home from "../../components/home-comp/home-comp";
import AddItems from "../../components/addItems-comp/addItems-comp";

const HomePage=()=>{
    return(
       <div className="home-page">
        <Home/>,
        <AddItems/>
       </div>

    );
}

export default HomePage;