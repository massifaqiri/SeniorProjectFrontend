// Form to Send Email To Reset Password
import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import emailjs from 'emailjs-com';

import './generic.css';

require('dotenv').config()
var jwt = require('jwt-simple');

class RecoverPassword extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { accountExists: false,
                       emailSent: false,
                       hashedPassword: '',
                       serverErrorMsg: '',
                       userErrorMsg: ''}
        this.confirmAccountExists = this.confirmAccountExists.bind(this);
    }

    // Reset states on page reload
    componentDidMount(){
        this.setState({accountExists: false, emailSent: false, hashedPassword: '', serverErrorMsg: '', userErrorMsg: ''});
    }

    // Query DB for email
    confirmAccountExists = async () => {
        let norsekey = this.refs.email.value;
        if (norsekey === "") {
            this.setState({errorMessage: "Norsekey is missing."})
        } else {
            let email = `${norsekey}@luther.edu`;
            await fetch(`${global.backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `SELECT * FROM Users WHERE email='${email}'`,
                })
            }).then(response => response.json())
            .then(object => this.setState({accountExists: (object.data.length > 0), hashedPassword: object.data.password}));
            this.sendEmail(email);
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
                            {this.state.userErrorMsg !== '' && (
                                <InputGroup>
                                    <Form.Control type="text" className="errorMsg" readOnly defaultValue={this.state.userErrorMsg}/>
                                </InputGroup>
                            )}
                            {this.state.serverErrorMsg !== '' && (
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
                        Recover Password
                    </Button>
                </Form>
        </div>
        )
    }
}

export default RecoverPassword;