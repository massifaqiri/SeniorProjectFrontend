import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import './styles/SignIn.css';

const bcrypt = require('bcryptjs');

class SignIn extends React.Component {

    constructor(props){
        super(props);
        this.state = {errMsg: ""}
        this.verifyLogin = this.verifyLogin.bind(this);
    }

    // Redirect to Home if User is Already Logged in
    componentDidMount() { 
        if (global.customAuth.isAuthenticated) {
            window.location.href = "/";
        }
    }

    // check email exists and password is correct
    verifyLogin = async (event) => {
        event.preventDefault(); // Page Reload
        let email = `${this.refs.email.value}@luther.edu`;
        let password = this.refs.password.value;
        let staySignedIn = this.refs.staySignedIn.checked;
        let result;
        await fetch(`${global.selectAPI}table=Users&field=password&condition=email='${email}'`, {
            method: "GET",
            headers: { "x-api-key": process.env.REACT_APP_API_KEY},
        }).then(response => response.json()
        .then(response => result = response));
        if (result.length > 0) {
            let hash = result[0].password;
            bcrypt.compare(password, hash, function(err, res) {
                // res is true or false
                if (res) {
                    global.customAuth.authenticate(email, staySignedIn);
                    window.location.href = "/"; // Replace with page that was last trying to be accessed?
                }
            });
            // If Window has not redirected in quarter of a second, password was incorrect
            setTimeout(() => { this.setState({errMsg: "Incorrect Password"}); }, 250);
        } else {
            // Alert User that Email was not found in the Database
            this.setState({errMsg: "No account exists with that email."})
        }
    }

    // Render Form to take username & password
    render() {
        return (
            <div className="row justify-content-center">
                <Col sm={12} md={8} lg={6}>
                    <Form onSubmit={this.verifyLogin}>
                        <Form.Group as={Row} controlId="validationUsername">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10} md={10} lg={10}>
                                <InputGroup>
                                    <Form.Control type="text" ref="email" placeholder="norsekey" required />
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
                                <Form.Control type="password" ref="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <p>{this.state.errMsg}</p>
                        <Form.Group as={Row}>
                            {/* Option for Resetting Password --> will need email functionality! */}
                            <Col sm={{span: 10, offset:2}}>
                                <a className="tinytext" href="/recoverpassword">Reset Password</a>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="staySignedIn">
                            {/* Option to stay signed in for 2 weeks */}
                            <Col sm={{span: 10, offset:2}}>
                                <Form.Check type="switch" ref="staySignedIn" label="Sign in for 2 weeks"/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{span: 10, offset:2}}>
                                <Button variant="primary" type="submit">Sign In</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </div>
        )
    }
}

export default SignIn;