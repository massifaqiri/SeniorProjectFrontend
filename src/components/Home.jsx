import React from 'react';
import { Button } from 'react-bootstrap';
import "./styles/Home.css";
import ControlledCarousel from "./Slideshow";

// This is the home page, the first page that the user will see. It contains a simple slideshow 
// advertising the website. It also contains buttons to Sign Up and Sign In.

class Home extends React.Component {
    render() {
        return (
            <div className="Home">
                <ControlledCarousel id="slideshow"/>
                <div className="text-center">
                    <a href="/signin"><Button variant="success">Sign In</Button></a>
                    <a href="/createaccount"><Button variant="secondary">Create Account</Button></a>
                </div>
                <div className="text-center">
                    <a href="/categories">Continue as guest</a>
                </div>
            </div>
        );
    }
}

export default Home;