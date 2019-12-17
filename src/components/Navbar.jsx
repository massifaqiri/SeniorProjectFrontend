// src/components/NavBar.js

import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap"; //Button
// import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa.js";


const NavBar = () => {
    const { loading, isAuthenticated, user } = useAuth0();

    let username = "undefined";

    if (user) {
        username = user.name;
    }

    // Keeps content from switching to non-logged in user while loading
    if (loading) {
        return (
            <Fragment>
                <p>&nbsp;</p>
            </Fragment>
        )
    }
    return (
        <Fragment>
            {isAuthenticated && (
                <Fragment>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="categories">Categories</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="profile">{username}</a>
                        </Navbar.Text>
                    </Nav>
                </Fragment>
            )}

            {/* Handles all non-authenticated sessions */}
            {!isAuthenticated && (
                <Fragment>
                    <Nav className="justify-content-end">
                        <Nav.Link>About us</Nav.Link>
                        <Nav.Link>How does it work</Nav.Link>
                    </Nav>

                </Fragment>
            )}
        </Fragment>
    );
};

export default NavBar;