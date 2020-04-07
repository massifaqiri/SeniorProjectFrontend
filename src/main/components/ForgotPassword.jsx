// Form to Send Email To Reset Password
import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import emailjs from 'emailjs-com';

import './styles/generic.css';

require('dotenv').config()
var jwt = require('jwt-simple');

class ForgotPassword extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { accountExists: false,
                       emailSent: false,
                       hashedPassword: '',
                       serverErrorMsg: '',
                       userEmail: '',
                       userErrorMsg: ''}
    }

    // Restrict user email entry to lowercase letters
    handleChange(event) {this.setState({userEmail: event.target.value.toLowerCase()})};

    // Verify Provided Email is associated with an Account
    confirmAccountExists = async () => {
        let norsekey = this.state.userEmail;
        if (norsekey === '') {
            this.setState({userErrorMsg: 'Norsekey is missing.'})
        } else {
            // Clear User Error Message
            if (this.state.userErrorMsg) {
                this.setState({userErrorMsg: ''})
            }
            // Query DB for email
            let email = `${norsekey}@luther.edu`;
            await fetch(`${global.selectAPI}table=Users&field=*&condition=email='${email}'`, {
                method: 'GET',
                headers: {'x-api-key': process.env.REACT_APP_API_KEY}
            })
            .then(response => response.json())
            .then(object => this.setState({accountExists: (object.length > 0), hashedPassword: object[0].password}))
            .catch(err => this.setState({serverErrorMsg: err.message}));
            if (this.state.accountExists){
                this.sendEmail(email);
            } else {
                this.setState({});
            }
        }
    }

    // emailjs-com & jwt-simple
    sendEmail = async (email) => {
        if (this.state.accountExists) {
            // Payload is NOT secure -- do not store password or JWT here!
            let payload = { userEmail: email }
            let d = new Date();
            // Secret IS secure
            let secret = `${this.state.hashedPassword}-${d.getTime()}`;
            // Save secret to database for retrieval in ResetPassword
            await fetch(`${global.insertAPI}table=Users&field=resetPasswordSecret&value='${secret}'`)
                .catch(err => this.setState({serverErrorMsg: err.text}));
            
            // Set up email parameters with JWT-embedded link
            let token = jwt.encode(payload, secret);
            const templateParams = {
                recipient: email,
                password_reset_link: `${global.thisURL}/resetpassword/${payload.userEmail}/${token}`, // Update this with a generated JWT!
                password_recovery: `${global.thisURL}/recoverpassword`
            }
            // Send Email
            emailjs.send('gmail', 'password_recovery', templateParams, `'${process.env.REACT_APP_EMAILJS_USER_ID}'`)
            .then((response) => {
                // Show Success Message, Make sure Error Messages is Hidden
                this.setState({emailSent: true, userErrorMsg: '', serverErrorMsg: ''});
            }, (err) => {
                this.setState({serverErrorMsg: err.text});
            });
        } else {
            // Show Error, Hide Success
            this.setState({userErrorMsg: 'No account exists with that email.', emailSent: false})
        }

    }

    render() {
        return (
            <div>
                <p>Please enter your email to reset your password.</p>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column xs={12} sm={12} md={1} lg={1} xl={1}>Email</Form.Label>
                        <Col sm={6} md={6} lg={6}>
                            <InputGroup>
                                <Form.Control type="text" ref="email" value={this.state.userEmail} onChange={this.handleChange} placeholder="norsekey" required />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="inputGroupAppend">@luther.edu</InputGroup.Text>
                                    </InputGroup.Append>
                            </InputGroup>

                            {this.state.userErrorMsg && (
                                <InputGroup>
                                    <Form.Control type="text" className="errorMsg" readOnly defaultValue={this.state.userErrorMsg}/>
                                </InputGroup>
                            )}
                            {this.state.serverErrorMsg && (
                                <div className="errorMsg">
                                    <p>Uff da! We've encountered the following error:</p>
                                    <p>{this.state.serverErrorMsg}</p>
                                    <p>Contact tech support here: <a href="mailto:hoffka04@luther.edu?Subject=Your%20App%20Is%20Busted" target="_top">hoffka04@luther.edu</a></p>
                                </div>
                            )}
                            {this.state.emailSent && (
                                <InputGroup>
                                    <Form.Control type="text" className="successMsg" readOnly defaultValue="Recovery email sent! Check your inbox for a link to reset your password."/>
                                </InputGroup>
                            )}
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={this.confirmAccountExists}>
                        Send Recovery Email
                    </Button>
                </Form>
        </div>
        )
    }
}

export default ForgotPassword;