import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

class CreateAccount extends React.Component {

    // Verify email DNE in DB
    verifyEmail = async (event) => {
        event.preventDefault();
        let email = this.refs.email;
        let rv = await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM Users WHERE email=${email}`,
            })
        });
        console.log(rv);
    }

    // Render Form to take email, password, and user info
    render() {
        return (
            <div className="row justify-content-center">
                <Col sm={12} md={10} lg={8}>
                    <Form>
                        <h3>Welcome to Campus Share!</h3>
                        <p>Please fill out the following information to enhance your experience.</p>
                    <Form.Group as={Row} ref="email">
                        <Form.Label column sm={2}>Email</Form.Label>
                        <Col sm={10} md={10} lg={10}>
                            <InputGroup>
                                <Form.Control type="text" placeholder="norsekey" required />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="inputGroupAppend">@luther.edu</InputGroup.Text>
                                    </InputGroup.Append>
                                <Form.Control.Feedback type="invalid">
                                Please use your valid luther.edu email.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="password">
                        <Form.Label column sm={2}>Password</Form.Label>
                        <Col sm={10} md={10} lg={10}>                    
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <p>Grad Year</p>
                    <p>Majors & Minors</p>
                    <p>Interests</p>
                    <Form.Group as={Row}>
                        <Col sm={{span: 10, offset:2}}>
                            <Button variant="primary" type="submit">Create Account</Button>
                        </Col>
                    </Form.Group>     
            </Form>
                </Col>
            </div>
        )
    }
}

export default CreateAccount;