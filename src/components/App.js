import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

// Component Imports
import NavBar from "./Navbar";

// Public Pages
import Landing from "./Landing";
import About from "./About";
import Categories from "./Categories";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";

// Private Pages
import Home from "./Home";
import Profile from "./Profile";
import RecoverPassword from "./RecoverPassword";

// Category Pages
import Textbooks from "./categories/Textbooks";
import Misc from "./categories/Misc";
import Skill from "./categories/Skill";
import Transport from "./categories/Transport";
import LostAndFound from "./categories/LostAndFound";
import Listing from "./categories/Listing";
import ResetPassword from './ResetPassword';

import Backdoor from "./Bcrypt_Backdoor";
// console.log(process.env);

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
  isAuthenticated: (getCookie("email") !== ""),
  email: getCookie("email"),
  authenticate(email, staySignedIn) {
    this.email = email;
    // Set expires to 24 hrs by default; add 14 days based on user selection later
    let d = new Date();
    let sessionLength = 24*60*60*1000;
    if (staySignedIn) {
      sessionLength *= 14;
    }
    console.log(sessionLength);
    d.setTime(d.getTime() + sessionLength);
    document.cookie = `email=${this.email}; expires=${d.toUTCString()}; path=/;`
  },
  signout() {
    // Set to Past Date
    let d = new Date();
    d.setTime(d.getTime() - (24*60*60*1000));
    document.cookie = `email=""; expires=${d.toUTCString()}; path=/;`
    window.location.href = "/";
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    global.customAuth.isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
       }} />
  )} />
)

// App: main body of the page
const App = () => {

  // Returns the App Instance
  return (
    <div className="App">
      <Router>
        {/* Nav Bar -- on all pages */}
        <NavBar />
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
            <Route path="/about" component={About}/>
            <Route path="/textbooks">
              <Textbooks sectionTitle="Textbooks" className="listing" />
            </Route>
            <Route path="/about" component={About} />
            <Route path="/lostandfound" component={LostAndFound} />
            <Route path="/listing" component={Listing} />
            <Route path="/misc" component={Misc} />
            <Route path="/skill" component={Skill} />
            <Route path="/transport" component={Transport} />
            <Route path="/signin" component={SignIn} />
            <Route path="/createaccount" component={CreateAccount} />
            {/* Keep a logged-in user from accessing? */}
            <Route path="/recoverpassword" component={RecoverPassword} />
            {/* Reset Password -- not logged in, but need a JSON Web Token to access */}
            <Route path="/resetpassword/:email/:token" component={ResetPassword} />
            {/* Private Pages */}
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/backdoor" component={Backdoor} />
          </Switch>
        </div>
        </Router>
        <p className="footerMessage">Candid Cheetah Co. &copy;2019-2020</p>
    </div>
  );
}

export default App;
