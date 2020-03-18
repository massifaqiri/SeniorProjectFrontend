import React, { Fragment } from "react"; //useState
import { Button, Form } from "react-bootstrap"; // Modal

// Custom Imports
import "./styles/Profile.css";

const bcrypt = require('bcryptjs');

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { errMsg: null }
  }

  changePassword = async () => {
    let newPassword = this.refs.newPassword.value;
    if (newPassword) {
      if (this.state.errMsg) {
        this.setState({errMsg: null});
      }
      
      // Encrypt newPassword
      bcrypt.hash(newPassword, 10, function(err, hash) {
        // Save to DB
        let url = `${global.updateAPI}table=Users&field=password&value='${hash}'&condition=email='${global.customAuth.email}'`;
        fetch(url, {
            method: 'GET',
            headers: {
              'x-api-key': process.env.REACT_APP_API_KEY,
            }
          })
          .then(response => response.json())
          .then(res => console.log(res))
          .catch(err => console.log(err.message));
      });
      // Display Success or Error to User
      // Sign out and redirect to /signin?
    } else {
      this.setState({errMsg: "Please enter a password."})
    }
  }


  render() {
    return (
      <Fragment>
        <h1>Profile Page</h1>
        <p>Change Password</p>
        <Form>
            <Form.Group controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control required type="password" ref="newPassword" placeholder="Password" />
            </Form.Group>
            <p>{this.state.errMsg}</p>
          <Button onClick={this.changePassword}>Change</Button>
        </Form>
      </Fragment>
    );
  }
};

export default Profile;