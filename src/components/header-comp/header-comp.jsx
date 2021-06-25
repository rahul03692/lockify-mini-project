import React from "react";
import '../../css/main.css';
//import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav class="navbar navbar-dark fixed-top navbar-expand-md navbar-no-bg">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          Navbar w/ text
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link scroll-link" href="#top-content">
                Top
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link scroll-link" href="/sign-in">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
