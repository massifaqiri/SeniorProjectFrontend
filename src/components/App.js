import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    withRouter,
} from "react-router-dom";

// Component Imports
import NavBar from "./Navbar";

// Public Pages
import Landing from "./Landing"
import Categories from "./Categories";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";

// Private Pages
import Home from "./Home";
import Profile from "./Profile";
import RecoverPassword from "./RecoverPassword";
import ResetPassword from "./ResetPassword";

// Category Pages
import Textbooks from "./categories/Textbooks";
import Misc from "./categories/Misc";

// Bootstrap Imports
import { Navbar } from 'react-bootstrap';

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// TODO: Check if a user is logged in with JWTs
global.customAuth = {
  isAuthenticated: (getCookie("auth") !== ""),
  email: getCookie("email"),
  authenticate(email) {
    this.email = email;
    // Set expires to 24 hrs by default; add 14 days based on user selection later
    let d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    document.cookie = `auth=true; expires=${d.toUTCString()}; path=/;`;
    document.cookie = `email=${this.email}; expires=${d.toUTCString()}; path=/;`
  },
  signout() {
    // Set to Past Date
    let d = new Date();
    d.setTime(d.getTime() - (24*60*60*1000));
    document.cookie = `auth=false; expires=${d.toUTCString()}; path=/;`;
    document.cookie = `email=""; expires=${d.toUTCString()}; path=/;`
    window.location.href = "/";
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    global.customAuth.isAuthenticated
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
)

// App: main body of the page
const App = () => {

  // Returns the App Instance
  return (
    <div className="App">
      <Router>
        {/* Nav Bar -- on all pages */}
        <Navbar className="App-navBar" expand="lg" sticky="top">
          <img src={require("./images/campushare_logo.png")} className="logo" alt="CampusShare Logo"/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavBar />
          </Navbar.Collapse>
        </Navbar>
        <div className="element">
          {/* Renders the proper content based on route */}
          <Switch>
            {/* Routes to Landing or Home based on if a user is logged in */}
            <Route path="/" exact render={(props) => (
              // The order of Landing and Home is opposite to what I would expect
              // ...just rolling with it for now.
              global.customAuth.isAuthenticated
              ? <Landing />
              : <Home {...props} />
            )} />
            <Route path="/categories" component={Categories}/>
            {/* Public Pages */}
            <Route path="/textbooks">
              <Textbooks sectionTitle="Textbooks" className="listing" />
            </Route>
            <Route path="/misc" component={Misc} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/createaccount" component={CreateAccount} />
            {/* Private Pages */}
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/recoverpassword" component={RecoverPassword} />
            <PrivateRoute path="/resetpassword:norsekey" component={ResetPassword} />
          </Switch>
        </div>
        </Router>
        <p className="footerMessage">Candid Cheetah Co. &copy;2019-2020</p>
    </div>
  );
}

export default App;
