import "./App.css";
//import Header from './components/header-comp/header-comp';
//import MainBody from './components/main-body/main-body-comp';
import SignInSignOut from "./pages/sign-in-sign-out/sign-in-sign-out-comp";
import HomePage from "./pages/home/home-page-comp";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/signup/signup-comp";
import LandingPage from "./pages/landing-page/landing-page-comp";

function App() {
  
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/sign-in" component={SignInSignOut} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/home" component={HomePage} />
      </Switch>
    </div>
  );
}
export default App;
