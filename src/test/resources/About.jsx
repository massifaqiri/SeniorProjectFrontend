import React from 'react';
import "../../main/components/styles/About.css";
import AboutSub from './AboutSub';

class About extends React.Component {

    render() {
        return (
            <div className="about">
                <img className="aboutUs" src={require("../../main/components/images/AboutUs.png")} alt="About Us"/>
                <ul>
                    <li>Luther students are able to connect with other Luther students and faculty</li>
                    <li>Will help with textbook trading, transportation, etc.</li>
                    <li>User friendly</li>
                    <li>Come up with more</li>
                </ul>
                <AboutSub id="aboutSub"/>
            </div>
        );
    }
}

export default About;