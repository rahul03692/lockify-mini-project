import React from "react";
import Home from "../../components/home-comp/home-comp";
import AddItems from "../../components/addItems-comp/addItems-comp";
import Cell from "../../components/cell-comp/cell-comp";

const HomePage=()=>{
    return(
       <div className="home-page">
        <Home/>
        <AddItems/>
        <Cell/>
       </div>

    );
}

export default HomePage;