import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props){
        super(props);
        this.verify = this.verify.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.verifyUsername = this.verifyUsername.bind(this);
    }

    // check username exists
    verifyUsername() {
        // fetch()...
    }

    // check password is correct
    verifyPassword() {
        // fetch()...
    }

    verify() {
        console.log("Verifying Login Info!")
        // this.verifyUsername();
        // this.verifyPassword();
    }

    // Render Form to take username & password
    render() {
        return (
            <div class="row justify-content-center">
                <Col sm={12} md={8} lg={6}>
                    <Form>
                        <Form.Group as={Row} controlId="validationUsername">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10} md={10} lg={10}>
                                <InputGroup>
                                    <Form.Control type="text" placeholder="norsekey" required />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="inputGroupAppend">@luther.edu</InputGroup.Text>
                                        </InputGroup.Append>
                                    {/* Add @luther.edu ending */}
                                    <Form.Control.Feedback type="invalid">
                                    Please use your valid luther.edu email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="validationPassword">
                            <Form.Label column sm={2}>Password</Form.Label>
                            <Col sm={10} md={10} lg={10}>                    
                                <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            {/* Option for Resetting Password --> will need email functionality! */}
                            <Col sm={{span: 10, offset:2}}>
                                <a class="tinytext" href="/recoverpassword">Reset Password</a>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="staySignedIn">
                            {/* Option to stay signed in for 2 weeks */}
                            <Col sm={{span: 10, offset:2}}>
                                <Form.Check type="switch" id="stay-signed-in" label="Sign in for 2 weeks"/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{span: 10, offset:2}}>
                                <Button variant="primary" type="button" onClick={this.verify}>Sign In</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </div>
        )
    }
}

export default SignIn;