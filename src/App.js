import React, { Fragment } from 'react';
import './App.css';
// Routing Imports
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

// Class Imports
import Home from "./Home";
import Landing from "./Landing"
import Listing from "./components/Listing";
import Categories from "./Categories";
import NavBar from "./components/Navbar";
import About from "./compenents/About";
import Transport from "./categories/Transport";
import Skill from "./categories/Skill";
import { useAuth0 } from "./react-auth0-spa.js";
import Profile from "./components/Profile";
import Sender from "./components/Sender";

// Bootstrap Imports
import { Navbar, Spinner } from 'react-bootstrap';

// Amplify imports
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';

// App: main body of the page. Includes form, test, image
const App = () => {

  const { loading, user } = useAuth0();

  if (loading) {
    return (
      <Fragment>
        &nbsp;
        <Spinner animation="border" size="sm"/>
        &nbsp;Loading...
      </Fragment>
    )
  }

  // Returns the App Instance
  return (
    <div className="App">
      <Router>
        {/* Nav Bar -- on all pages */}
        <Navbar className="App-navBar" expand="lg" sticky="top">
          <img src={require("./campushare_logo.png")} className="logo" alt="CampusShare Logo"/>
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
              {typeof user !== "undefined" && (
                <Landing userData={user} />
              )}
              {typeof user === "undefined" && (
                <Home />
              )}
            </Route>
            <Route path="/textbooks">
              <Listing sectionTitle="Textbooks" className="listing" userData={user} />
            </Route>
            <Route path="/categories">
              <Categories />
            </Route>
            <Route path="/profile">
              <h1>Profile Page</h1>
              <Profile />
            </Route>
            <Route path="/sender">
              <Sender />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/transport">
              <Transport />
            </Route>
            <Route path="/skill">
              <Skill />
            </Route>
          </Switch>
        </div>
        </Router>
        <p className="footerMessage">Candid Cheetah Co. &copy;2019-2020</p>
    </div>
  );
}

export default App;
