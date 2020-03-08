// Form to Send Email To Reset Password
import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

require('dotenv').config()

class RecoverPassword extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { accountExists: false,
                       emailDNEvisible: false }
        this.confirmAccountExists = this.confirmAccountExists.bind(this);
    }

    // Reset validity of account to true on page load
    componentDidMount(){
        this.setState({accountExists: false});
    }

    // Query DB for email
    confirmAccountExists = async () => {
        console.log(this.refs.email.value);
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM Users WHERE email='${this.refs.email.value}@luther.edu'`,
            })
        }).then(response => response.json())
        .then(object => this.setState({accountExists: (object.data.length > 0)}))
        this.sendEmail();
    }

    // emailjs-com
    sendEmail = async () => {
        console.log("In sendEmail");
        if (this.state.accountExists) {
            console.log("Before sending email");
            // Send Email
                        
        } else {
            this.setState({emailDNEvisible: true})
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
                            {this.state.emailDNEvisible && (
                                <InputGroup>
                                    {/* <Form.Control type="text"  */}
                                </InputGroup>
                            )}
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
                    <Button variant="primary" onClick={this.confirmAccountExists}>
                        Recover Password
                    </Button>
                </Form>
        </div>
        )
    }
}

export default RecoverPassword;