// Form to Send Email To Reset Password
import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
const nodemailer = require('nodemailer');

class RecoverPassword extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { accountExists: false }
        this.confirmAccountExists = this.confirmAccountExists.bind(this);
    }

    // Reset validity of account to true on page load
    componentDidMount(){
        this.setState({accountExists: false});
    }

    // Query DB for email
    confirmAccountExists = async () => {
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM Users WHERE email='${this.refs.email.value}@luther.edu'`,
            })
        }).then(response => response.json())
        .then(data => this.setState({accountExists: data.length !== 0}))
        .then(this.sendEmail());
    }

    // nodemailer
    sendEmail = async () => {
        if (this.state.accountExists) {
            console.log("Before sending email");
            // Send Email
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });
            let info = await transporter.sendMail({
                from: '"Campus Share Tech Support" <techsupport@campus-share.com>',
                to: this.refs.email,
                subject: "Password Recovery",
                text: "Please follow this link to reset your password:",
                html: `<a href='${global.thisURL}/resetpassword'></a>`
            });
            console.log(`Message sent: ${info.messageId}`);
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        } else {
            alert("This account DNE");
        }

    }

    render() {
        return (
            <div>
                <p>Please enter your email to recover your password.</p>
                <Form onSubmit={this.confirmAccountExists}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10} md={10} lg={10}>
                            <InputGroup>
                                <Form.Control type="text" ref="email" placeholder="norsekey" required />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="inputGroupAppend">@luther.edu</InputGroup.Text>
                                    </InputGroup.Append>
                                <Form.Control.Feedback type="invalid">
                                    This account does not exist.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Recover Password
                    </Button>
                </Form>
        </div>
        )
    }
}

export default RecoverPassword;