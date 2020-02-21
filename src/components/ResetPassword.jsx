// where a user can reset their password
// only visible through clicking an email link
import React from 'react';
import { Button, Form } from 'react-bootstrap';
// const bcrypt = require('bcrypt');

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.checkMatch = this.checkMatch.bind(this);
        this.savePassword = this.savePassword.bind(this);
        this.state = { validated: false,
                       passwordSaved: false }
    }

    // Confirm passwords match
    checkMatch = () => {
        return (this.refs.newPassword.value === this.refs.confirmNewPassword.value);
    }

    // Save Password to DB (HASH & SALT!)
    // Also need to know which user it is! How do I do this with email???
    savePassword = event => {
        let matches = this.checkMatch();
        if (matches) {
            let password = this.refs.newPassword.value;
            // Use Bcrypt here!
            password = "NOTHASHED&SALTEDYET";
            let response = fetch(`${global.backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `UPDATE Users SET password=${password} WHERE email='hoffka04@luther.edu'`,
                })
            });
            if (!response.ok) {
                alert(`HTTP-Error: ${response.status}`);
            }
            this.setState({passwordSaved: true});
        } else {
            event.preventDefault();
            event.stopPropagation();
            this.setState({validated: false});
        } 
    }

    render() {
        return (
            // Form to change password (enter x2 and make sure to match!)
            <Form noValidate validated={this.state.validated} onSubmit={this.savePassword}>
                <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control required type="password" ref="newPassword" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="confirmNewPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control required type="password" ref="confirmNewPassword" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default ResetPassword;