import React, { Fragment } from "react"; //useState
import { Button, Col, Form } from "react-bootstrap"; // Modal

// Custom Imports
import "./styles/Profile.css";

const bcrypt = require('bcryptjs');

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { errMsg: null, reset: false }
  }

  changePassword = async () => {
    let newPassword = this.refs.newPassword.value;
    let verifyPassword = this.refs.verifyPassword.value;
    if (newPassword) {
      if (verifyPassword){
        if (newPassword === verifyPassword) {
          if (this.state.errMsg) {
            this.setState({errMsg: null});
          }
          
          // Encrypt newPassword
          let hash = bcrypt.hashSync(newPassword, 10);
          console.log(hash);

          // Save to DB
          let url = `${global.updateAPI}table=Users&field=password&value='${hash}'&condition=email='${global.customAuth.email}'`;
          await fetch(url, {
              method: 'GET',
              headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
              }
            })
            .then(response => response.json())
            .then(res => this.setState({reset: true}))
            .catch(err => this.setState({errMsg: err.message}));

          // Sign out and redirect to /signin?
        } else {
          this.setState({errMsg: "Passwords do not match."})
        }
      } else {
        this.setState({errMsg: "Please retype your password."})
      }
    } else {
      this.setState({errMsg: "Please enter a password."})
    }
  }


  render() {
    return (
      <Fragment>
        <h1>Profile Page</h1>
        <Col xs={12} s={12} m={8} lg={6} xl={6}>
          <Form>
            <Form.Group>
              <Form.Control type="text" readOnly value="Change Password"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control required type="password" ref="newPassword" placeholder="Password"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control required type="password" ref="verifyPassword" placeholder="Retype Password"/>
            </Form.Group>
            {this.state.reset && (<p>Password Reset! Please sign in: <a href="/signin">Log in</a></p>)}
            <p>{this.state.errMsg}</p>
            <Button onClick={this.changePassword}>Change</Button>
          </Form>
        </Col>
      </Fragment>
    );
  }
};

export default Profile;