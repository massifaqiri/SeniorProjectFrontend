import React from 'react';
import "./Home.css";
import LoginButton from "./components/LoginButton";
import ControlledCarousel from "./components/Slideshow";

class Home extends React.Component {

    render() {
        return (
            <div className="Home">
                <ControlledCarousel id="slideshow"/>
                <LoginButton id="baseLoginButton" />
            </div>
        );
    }
}

export default Home;