import React from 'react';
import { Button, Row } from 'react-bootstrap';

// Custom Imports
import "./Home.css";
import ControlledCarousel from "./Slideshow";

class Home extends React.Component {

    render() {
        return (
            <div className="Home">
                <ControlledCarousel id="slideshow"/>
                <div class="text-center">
                    <a href="/signin"><Button variant="success">Sign In</Button></a>
                    <Button variant="secondary">Create Account</Button>
                </div>
            </div>
        );
    }
}

export default Home;