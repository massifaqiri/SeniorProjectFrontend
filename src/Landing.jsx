import React from 'react';
import { Button, Col, Row, Toast } from 'react-bootstrap';
import "./Landing.css";
// import UserDetailsModal from './components/UserDetailsModal';

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false,
                       userData: this.props.userData,
                       requests: [],
                       offers: []
                     }
    }

    componentDidMount = async () => {
        // Have to check for a user to avoid errors thrown (though this page should not be visible if there is not a user)
        if (this.state.userData !== "undefined") {
            // Fetch user
            let userQueryResults = await fetch(`${backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `SELECT * from Users WHERE email="${this.state.userData.email}"`,
                        }), }).then(response => response.json());
            console.log(userQueryResults);
            if (userQueryResults.data.length === 0){
                // console.log("User is new");
                // Add User to Database
                await fetch(`${backendURL}/query`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: `INSERT INTO Users (email) VALUES ("${this.state.userData.email}")`,
                    }),
                })
                .catch(error => {
                    console.error(error);
                });
                // Display User Details modal
                this.setState({showModal: true});
            }

            // Populate Request Notifications
            await fetch(`${backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `SELECT * from Notifications WHERE requester_email="${this.state.userData.email}" ORDER BY notification_id DESC`,
                        }), })
                        .then(response => response.json())
                        .then(data => this.setState({requests: data.data}));

            // Populate Offer Notifications
            await fetch(`${backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `SELECT * from Notifications WHERE offerer_email="${this.state.userData.email}" ORDER BY notification_id DESC`,
                        }), })
                        .then(response => response.json())
                        .then(data => this.setState({offers: data.data}));
        } else {
            // A non-logged in user shouldn't be able to see this page...
            console.log("No user");
        };
    }

    render() {
        return (
            <div className="Home">
                <div className="clearfix">
                    <img className="bell2" src={require("./bell.png")} alt="Luther Bell"/>
                    <h1 className="heading1">Home</h1>
                    <h3 className="heading3">See updates here</h3>
                </div>
                <p>Notifications</p>
                <div className="notifyCard">
                    <div className="notifyBorder">
                        {/* TODO: Populate the nofications from db notifications table */}
                        <Col className='notifyCol'>
                            {this.state.requests && (
                                this.state.requests.map(request =>
                                    <Toast>
                                        <Toast.Header>
                                            <strong className="mr-auto">Request</strong>
                                            <small>from {request.offerer_email}</small>
                                        </Toast.Header>
                                        <Toast.Body>This request is still pending.</Toast.Body>
                                    </Toast>
                                    // <Row><p>{request.offerer_email} </p></Row>
                                )
                            )}
                            {this.state.offers && (
                                this.state.offers.map(offer =>
                                    <Row><p>Susan requests this book</p><Button variant="success" size="sm">Approve</Button><Button variant="danger" size="sm">Decline</Button></Row>
                                )
                            )}
                        </Col>
                    </div>
                </div>
                {/* TODO: Show UserDetails_Modal if user is newly added to DB (edit showModal value) */}
                {/* <UserDetailsModal closePhrase="Later" show={this.state.showModal} title="Add your details!"/> */}
            </div>
        );
    }
}

export default Landing;
