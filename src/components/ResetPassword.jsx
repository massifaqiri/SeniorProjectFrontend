import React, { Fragment } from 'react';
import { Button, Form, Spinner} from 'react-bootstrap';
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

// Requires JWT to access this component's page
// Two views of the component: one for the page, and one for the user's profile?


class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.savePassword = this.savePassword.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { userEmail: '',
                       hashedPassword: '',
                       secret: '',
                       token: '',
                       validated: false,
                       passwordSaved: false,
                       serverErrorMsg: '',
                       showError: false}
        this.validate = this.validate.bind(this);
    }

    componentWillMount() {
        let url_parts = window.location.href.split('/');
        let email = url_parts[4];
        let JWT = url_parts[5];
        this.setState({userEmail: email, token: JWT});
    }

    componentDidMount() {
        this.getSecret();
        this.validate();
    }

    getSecret = async () => {
        await fetch(`${global.selectAPI}table=Users&field=*&condition=email='${this.state.userEmail}'`)
        .then(response => response.json())
        .then(object => this.setState({secret: object[0].resetPasswordSecret, hashedPassword: object[0].password}))
        .catch(err => this.setState({serverErrorMsg: err.text}));
    };

    // Validate JWT
    validate = async () => {
        if (this.state.hashedPassword === this.state.secret.slice(0,(this.state.hashedPassword.length))) {
            try {
                let decoded = jwt.decode(this.state.token, this.state.secret);
                if (decoded === this.state.userEmail) {
                    this.setState({validated: true});
                } else {
                    this.setState({showError: true});
                }
            } catch(err) {
                this.setState({showError: true});
            }
        } else {
            this.setState({showError: true});
        }
    }

    // Save Password to DB (HASH & SALT!)
    // Also need to know which user it is -- could probably pull from URL parameter! (still not secure, though...)
    savePassword = async (password) => {
        bcrypt.hash(password, 8, async function(err, hash){
            await fetch(`${global.backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `UPDATE Users SET password='${hash}' WHERE email='${global.customAuth.email}`,
                })
            }).then(response => response.json()
            .then(console.log(response)));
            // Check response to make sure this goes through! before reloading the page.
        });
        // Require users to sign in again?
    }

    handleSubmit = () => {
        let password = this.refs.newPassword.value;
        console.log(password);
        if (password.length === 0) {
            alert("no password");
        } else {
            this.savePassword(this.refs.newPassword.value);
            alert("password saved successfully!")
            setTimeout(5000);
            this.setState({validated: true});
        }
    }

    render() {
        return (
            <Fragment>
            {/* Only show form if user is validated */}
            { this.state.validated === false
                // Spinner for Loading Validation
                ? ( this.state.showError === false
                    ? (<Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                       </Spinner>)
                    : (<Fragment>
                            <p>This link is not valid. Please request a new password reset link:</p>
                            <a href="/recoverpassword">Request New Link</a>
                       </Fragment>)
                  )
                // Form to change password
                :   (<Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control required type="password" ref="newPassword" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>)
            }
            </Fragment>
        )
    }
}

export default ResetPassword;