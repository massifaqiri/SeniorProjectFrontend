import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

const bcrypt = require('bcryptjs');

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = { accountCreated: false,
                       errMsg: null,
                       validEmail: true }
    };

    // Verify email DNE in DB
    verifyEmail = async () => {
        let email = `${this.refs.email.value}@luther.edu`;
        let password = `${this.refs.password.value}`;
        await fetch(`${global.selectAPI}table=Users&field=*&condition=email='${email}'`, {
                method: "GET",
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                },
            })
            .then(response => response.json())
            .then(response => this.setState({validEmail: response.length === 0}))
            .catch(err => console.log(err));
        if (!this.state.validEmail) {
            this.setState({errMsg: "An account with this email already exists. Please sign in."})
        } else {
            this.savePassword(email, password);
        }
    }

    // Add Password to DB
    savePassword = async (email, password) => {
        // Check that Password is valid
        if (password !== '') {
            // Hash Password
            bcrypt.hash(password, 10, function(err, hash) {
                fetch(`${global.insertAPI}table=Users&field=email,password&value='${email}','${hash}'`, {
                    method: "GET",
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    },
                })
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.log(err));
            });
            this.setState({accountCreated: true})
        } else {
            this.setState({errMsg: "Please provide a valid password"});
        }
    }

    // Render Form to take email, password, and user info
    render() {
        return (
            <div className="row justify-content-center">
                <Col sm={12} md={10} lg={8}>
                    <Form>
                        <h3>Welcome to Campus Share!</h3>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10} md={10} lg={10}>
                                <InputGroup>
                                    <Form.Control type="text" ref="email" placeholder="norsekey" required />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="inputGroupAppend">@luther.edu</InputGroup.Text>
                                        </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="password">
                            <Form.Label column sm={2}>Password</Form.Label>
                            <Col sm={10} md={10} lg={10}>                    
                                <Form.Control type="password" ref="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <p>{this.state.errMsg}</p>
                        {this.state.accountCreated && (
                            <p>Account created! Please login here: <a href="/signin">Sign In</a></p>
                        )}
                        <Form.Group as={Row}>
                            <Col sm={{span: 10, offset:2}}>
                                <Button variant="primary" onClick={this.verifyEmail}>Create Account</Button>
                            </Col>
                        </Form.Group>     
                    </Form>
                </Col>
            </div>
        )
    }
}

export default CreateAccount;