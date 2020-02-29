// src/components/NavBar.js

import React, { Fragment } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";


const NavBar = () => {

    return (
        <Fragment>

            { global.customAuth.isAuthenticated
                ? (
                    <Fragment>
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/categories">Categories</Nav.Link>
                        </Nav>
                        <Nav className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="/profile">{global.customAuth.email}</a>
                            </Navbar.Text>
                            <Button variant="outline-secondary" size="sm" onClick={global.customAuth.signout}>Sign Out</Button>
                        </Nav>
                    </Fragment>
                )
                : (
                    <Fragment>
                        <Nav className="justify-content-end">
                            <Nav.Link>About us</Nav.Link>
                            <Nav.Link>How does it work</Nav.Link>
                        </Nav>

                    </Fragment>
                )
            }
        </Fragment>
    );
};

export default NavBar;