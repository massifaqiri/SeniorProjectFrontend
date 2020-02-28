import React from 'react';
import { Button, Form } from 'react-bootstrap';
const bcrypt = require('bcryptjs');

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.savePassword = this.savePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    query: `UPDATE Users SET password='${hash}' WHERE email='hoffka04'@luther.edu`,
                })
            })
        })
    }

    handleSubmit = event => {
        let password = this.refs.newPassword.value;
        if (password.length === 0) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.savePassword(this.refs.newPassword.value);
        this.setState({validated: true});
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