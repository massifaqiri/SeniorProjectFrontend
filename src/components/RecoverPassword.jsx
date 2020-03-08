// Form to Send Email To Reset Password
import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import './generic.css';

require('dotenv').config()

class RecoverPassword extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { accountExists: false,
                       accountDNEvisible: false,
                       emailSent: false }
        this.confirmAccountExists = this.confirmAccountExists.bind(this);
    }

    // Reset validity of account to true on page load
    componentDidMount(){
        this.setState({accountExists: false, accountDNEvisible: false, emailSent: false});
    }

    // Query DB for email
    confirmAccountExists = async () => {
        let email = `${this.refs.email.value}@luther.edu`;
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM Users WHERE email='${email}'`,
            })
        }).then(response => response.json())
        .then(object => this.setState({accountExists: (object.data.length > 0)}));
        this.sendEmail(email);
    }

    // emailjs-com
    sendEmail = async (email) => {
        if (this.state.accountExists) {
            const templateParams = {
                recipient: email,
                password_reset_link: "http://localhost:3000/profile"
            }
            // Send Email
            emailjs.send('gmail', 'password_recovery', templateParams, 'user_tKy4SXYTGu1s5eJEaRgjT')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text)
                // Show Success Message, Make sure Error Message is Hidden
                this.setState({emailSent: true, accountDNEvisible: false});
            }, (err) => {
                console.log('FAILED...', err);
            });
        } else {
            // Show Error, Hide Success
            this.setState({accountDNEvisible: true, emailSent: false})
        }

    }

    render() {
        return (
            <div>
                <p>Please enter your email to recover your password.</p>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column xs={12} sm={12} md={1} lg={1} xl={1}>Email</Form.Label>
                        <Col sm={6} md={6} lg={6}>
                            <InputGroup>
                                <Form.Control type="text" ref="email" placeholder="norsekey" required />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="inputGroupAppend">@luther.edu</InputGroup.Text>
                                    </InputGroup.Append>
                            </InputGroup>
                            {this.state.accountDNEvisible && (
                                <InputGroup>
                                    <Form.Control type="text" className="errorMsg" readOnly defaultValue="No account found with that email"/>
                                </InputGroup>
                            )}
                            {this.state.emailSent && (
                                <InputGroup>
                                    <Form.Control type="text" className="successMsg" readOnly defaultValue="Recovery email sent! Check your inbox within 2 hrs."/>
                                </InputGroup>
                            )}
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={this.confirmAccountExists}>
                        Recover Password
                    </Button>
                </Form>
        </div>
        )
    }
}

export default RecoverPassword;