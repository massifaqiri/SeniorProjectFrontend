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

// Amplify imports
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';


// TODO: Check if a user is logged in with JWTs
const customAuth = {
  isAuthenticated: false,
  // Replace with *actual* authentication
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  // Replace with *actual* signout
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    customAuth.authenticated
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
              customAuth.isAuthenticated
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
