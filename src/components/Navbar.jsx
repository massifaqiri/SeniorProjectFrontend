// src/components/NavBar.js

import React, { Fragment, useState} from "react";
import { Button, Col, Nav, Navbar, Row, Toast } from "react-bootstrap";

import "./styles/Navbar.css";

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

const NavBar = () => {
    const CDCookie = (getCookie("CDCToastRead") === "");
    const [showToast, setShowToast] = useState(CDCookie);
    const closeToast = () => {
        setShowToast(false);
        document.cookie = "CDCToastRead=true; path=/";
    };

    return (
        <div>
        <Navbar className="App-navBar" expand="lg" sticky="top">
            <Row>
                <Col xs={4} sm={4} md={2} lg={2} xl={2}>
                    {/* For some reason, adding a link to the home page messes up the placement */}
                    <a href="/">
                        <img src={require("./images/campushare_logo.png")} className="logo" alt="CampusShare Logo"/>
                    </a>
                </Col>
                <Col xs={0} sm={0} md={2} lg={2} xl={2}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="floatRight" />
                </Col>
                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Navbar.Collapse id="basic-navbar-nav">
                        { global.customAuth.isAuthenticated
                            ? (
                                <Fragment>
                                    <Nav className="mr-auto">
                                        <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/categories">Categories</Nav.Link></Nav.Item>
                                    </Nav>
                                    <Nav className="justify-content-end">
                                        <Nav.Item>
                                            <Navbar.Text>
                                                Signed in as: <a href="/profile">{global.customAuth.email}</a>
                                            </Navbar.Text>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Button variant="outline-secondary" size="sm" className="btn-signOut" onClick={global.customAuth.signout}>Sign Out</Button>
                                        </Nav.Item>
                                    </Nav>
                                </Fragment>
                            )
                            : (
                                <Fragment>
                                    <Nav className="mr-auto">
                                        <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link disabled >How does it work</Nav.Link></Nav.Item>
                                        <Nav.Item><Nav.Link href="/categories">Categories</Nav.Link></Nav.Item>
                                    </Nav>
                                    <Nav className="justify-content-end">
                                        <a href="/signin"><Button variant="success" size="sm" className="btn-signIn">Sign In</Button></a>
                                    </Nav>
                                </Fragment>
                            )
                        }
                    </Navbar.Collapse>
                </Col>
            </Row>
        </Navbar>
        <div className="row justify-content-center">
            {showToast &&
                <Toast onClose={closeToast} className="toast_CDC">
                    <Toast.Header>
                        <img src={require("./images/CDC_logo.jpg")} alt="CDC Logo" className="img_CDC"/>
                        <strong className="mr-auto">Information on COVID-19</strong>
                    </Toast.Header>
                    <Toast.Body>Please visit the <a href="https://www.cdc.gov/">CDC</a> for the most recent updates</Toast.Body>
                </Toast>
            }
        </div>
        </div>
    );
};

export default NavBar;