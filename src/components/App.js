import React from 'react';
import './App.css';
// Routing Imports
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


// Class Imports
import Home from "./Home";
// import Landing from "./Landing"
import Textbooks from "./categories/Textbooks";
import Categories from "./Categories";
import NavBar from "./Navbar";
import Profile from "./Profile";
import SignIn from "./SignIn";
import RecoverPassword from "./RecoverPassword";
import CreateAccount from "./CreateAccount";
import ResetPassword from "./ResetPassword";

// Bootstrap Imports
import { Navbar, Spinner } from 'react-bootstrap';

// Amplify imports
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';

// App: main body of the page
class App extends React.Component {

  constructor(props) {
    super(props);
  }

  // TODO: Check if a user is logged in (determines view)
  authenticate = () => {
    const fakeAuth = {
      isAuthenticated: false,
      authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
      },
      signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100); // fake async
      }
  }
  // Loading Page -- can we still use this in render?
  //   return (
  //     <Fragment>
  //       &nbsp;
  //       <Spinner animation="border" size="sm"/>
  //       &nbsp;Loading...
  //     </Fragment>
  //   )

  // Returns the App Instance
  render() {
    return (
      <div className="App">
        <Router>
          {/* Nav Bar -- on all pages */}
          <Navbar className="App-navBar" expand="lg" sticky="top">
            <img src={require("./images/campushare_logo.png")} className="logo" alt="CampusShare Logo"/>
            {/* Change button color - Use bsPrefix? */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <NavBar />
            </Navbar.Collapse>
          </Navbar>
          <div className="element">
            {/* Renders the proper content based on route */}
            <Switch>
              <Route path="/" exact>
                {/* TODO: Route Landing or Home based on if a user is logged in */}
                {/* <Landing /> */}
                  <Home />
              </Route>
              {/* Listing of Categories */}
              <Route path="/categories" component={Categories}/>
              {/* Category Pages */}
              <Route path="/textbooks">
                <Textbooks sectionTitle="Textbooks" className="listing" />
              </Route>
              <Route path="/misc">
                {/* <Misc /> */}
              </Route>
              {/* Routes that need authentication */}
              <Route path="/profile">
                <h1>Profile Page</h1>
                <Profile />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/recoverpassword">
                <RecoverPassword />
              </Route>
              <Route path="/createaccount">
                <CreateAccount />
              </Route>
              <Route path="/resetpassword:norsekey">
                <ResetPassword />
              </Route>
            </Switch>
          </div>
          </Router>
          <p className="footerMessage">Candid Cheetah Co. &copy;2019-2020</p>
      </div>
    );
  }
}

export default App;
