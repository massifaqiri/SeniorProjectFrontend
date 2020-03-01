import React from 'react';
import { Button, Form } from 'react-bootstrap';
const bcrypt = require('bcryptjs');

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.savePassword = this.savePassword.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { validated: false,
                       passwordSaved: false }
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
            // Form to change password
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control required type="password" ref="newPassword" placeholder="Password" />
                    <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export default ResetPassword;