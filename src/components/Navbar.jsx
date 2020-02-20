// src/components/NavBar.js

import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap"; //Button
// import { Link } from "react-router-dom";


const NavBar = () => {

    return (
        <Fragment>
            <Fragment>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="categories">Categories</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <Navbar.Text>
                        {/* Signed in as: <a href="profile">{username}</a> */}
                    </Navbar.Text>
                </Nav>
            </Fragment>

            {/* Handles all non-authenticated sessions */}
            {/* {!isAuthenticated && (
                <Fragment>
                    <Nav className="justify-content-end">
                        <Nav.Link>About us</Nav.Link>
                        <Nav.Link>How does it work</Nav.Link>
                    </Nav>

                </Fragment>
            )} */}
        </Fragment>
    );
};

export default NavBar;