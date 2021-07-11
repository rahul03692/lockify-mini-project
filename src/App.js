import "./App.css";

import SignInSignOut from "./pages/sign-in-sign-out/sign-in-sign-out-comp";
import HomePage from "./pages/home/home-page-comp";
import { Switch, Route } from "react-router-dom";
import SignUp from "./pages/signup/signup-comp";
import LockUnlock from "./pages/lock-unlock-page/lock-unlock-page-comp";
import LandingPage from "./pages/landing-page/landing-page-comp";
import LoginWithOtp from "./components/login-otp-comp/login-otp-comp";

function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/sign-in" component={SignInSignOut} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/locks" component={LockUnlock} />
        <Route exact path="/loginotp" component={LoginWithOtp}/>
      </Switch>
    </div>
  );
}
export default App;
