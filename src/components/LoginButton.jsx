// src/components/NavBar.js

import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "../react-auth0-spa.js";

const LoginButton = () => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();

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
                    Signed in as: <a href="profile">{username}</a>
                </Fragment>
            )}

            {/* Handles all non-authenticated sessions */}
            {!isAuthenticated && (
                <Fragment>
                    <Button onClick={() => loginWithRedirect({})} variant="success" size="lg">Log in with your Luther account</Button>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoginButton;