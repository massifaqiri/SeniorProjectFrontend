import React from 'react';
import "./About.css";

class About extends React.Component {

    render() {
        return (
            <div className="about">
                <img className="aboutUs" src={require("./AboutUs.png")} alt="About Page"/>
                <li>Luther students are able to connect with other Luther students and faculty</li>
                <li>Will help with textbook trading, transportation, etc.</li>
                <li>User friendly</li>
            </div>
        );
    }
}

export default About;