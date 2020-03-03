// src/components/NavBar.js

import React, { Fragment } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";

import "./Navbar.css";

const NavBar = () => {

    return (
        <Navbar className="App-navBar" expand="lg" sticky="top">
            <img src={require("./images/campushare_logo.png")} className="logo" alt="CampusShare Logo"/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                                <Nav.Item><Nav.Link>How does it work</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link href="/categories">Categories</Nav.Link></Nav.Item>
                            </Nav>
                            <Nav className="justify-content-end">
                                <a href="/signin"><Button variant="success" size="sm" className="btn-signIn">Sign In</Button></a>
                            </Nav>
                        </Fragment>
                    )
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;