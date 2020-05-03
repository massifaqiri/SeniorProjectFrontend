import React from 'react';
import {Accordion, Card} from 'react-bootstrap';
import "./styles/About.css";

class About extends React.Component {

    render() {
        return (
            <div className="about">
                <div className="clearfix">
                    <div className="aboutUs">
                        <img className="img_25" src={require("./images/CandidCheetahs.png")} alt="Candid Cheetah Meeting"/>
                        <p className="caption"><i>Creators: Massi Faquiri, Kari Hoff, and Sam Sixta</i></p>
                    </div>
                    <h1 className="title">About Us</h1>
                    <p><i>CampusShare</i> is the product of a year-long senior project between three computer science students at Luther College.
                    The creators (right) conceptualized this app based on the following principles: </p>
                </div>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <p className="accord_togg">Collaboration</p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>As a liberal arts college, Luther is the perfect place for inter-disciplinary collaboration. CampusShare provides a space for students and faculty to seek certain skill sets for multi-major projects and research.</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <p className="accord_togg">Sustainability</p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Each year, students produce a lot of waste when they toss unwanted or unused items, especially during move-out. The Center for Sustainable Communities has an excellent move-out program in place to try to divert this waste. In an effort to aide this goal year-round, we are building upon this idea by providing a platform where items can be shared throughout the academic year.</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            <p className="accord_togg">Inclusivity</p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>CampusShare aims to connect students with one another through an all-in-one user friendly application. Many students rely on Facebook groups/pages and/or GroupMe to communicate, but that leaves out students who do not have FB and/or cell service. CampusShare is built as an inclusive platform for all students, as only a Luther email is required to sign up. All current students can participate in the social events, ride shares, meal invitations, and more that are posted on the app.</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                
                <p>CampusShare 1.0 Features</p>
                <ul>
                    <li>Categories: Skills, Textbooks, Transport, Lost & Found, Miscellaneous (Misc.)</li>
                </ul>

                <p>Coming Soon!</p>
                <ul>
                    <li>Real-time Notifications</li>
                    <li>Chatting, powered by AWS Cognito & AppSync</li>
                    <li>Mobile App (iOS & Android)</li>
                </ul>
                <hr />
                <p>Are you a student at Luther and undecided about your major?
                    Check out the classes offered in <a href="https://www.luther.edu/computer-science/">computer science</a>!</p>
            </div>
        );
    }
}

export default About;