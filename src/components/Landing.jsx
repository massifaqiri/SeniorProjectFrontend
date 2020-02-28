import React, { Fragment } from 'react';
import { Button, Col, Toast } from 'react-bootstrap';
import "./Landing.css";
// import UserDetailsModal from './components/UserDetailsModal';

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false,
                    //    userData: this.props.userData,
                       requests: [],
                       offers: []
                     }
        this.fetchNotifications = this.fetchNotifications.bind(this);
        this.dismissNotification = this.dismissNotification.bind(this);
    }

    // componentDidMount = async () => {
    //     // Have to check for a user to avoid errors thrown (though this page should not be visible if there is not a user)
    //     if (this.state.userData !== "undefined") {
    //         // Fetch user
    //         let userQueryResults = await fetch(`${backendURL}/query`, {
    //                     method: "POST",
    //                     headers: { "Content-Type": "application/json" },
    //                     body: JSON.stringify({
    //                         query: `SELECT * from Users WHERE email="${this.state.userData.email}"`,
    //                     }), }).then(response => response.json());
    //         if (userQueryResults.data.length === 0){
    //             // console.log("User is new");
    //             // Add User to Database
    //             await fetch(`${backendURL}/query`, {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({
    //                     query: `INSERT INTO Users (email) VALUES ("${this.state.userData.email}")`,
    //                 }),
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             });
    //             // Display User Details modal
    //             this.setState({showModal: true});
    //         }
    //         this.fetchNotifications();
    //     } else {
    //         // A non-logged in user shouldn't be able to see this page...
    //         console.log("No user");
    //     };
    // }

    fetchNotifications = async () => {
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
    }

    // Sends an approval or decline message (notification)
    sendMessage = async (notificationId, status) => {
        await fetch(`${backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `UPDATE Notifications SET status = "${status}" WHERE notification_id = "${notificationId}"`,
            })
        })
        .catch(error => {
            console.error(error);
        });
        this.fetchNotifications();
    }

    // Dismisses a notification (sets that specific Toast component's display to none)
    dismissNotification = () => {
    }

    render() {
        return (
            <div className="Home">
                <div className="clearfix">
                    <img className="bell2" src={require("./images/bell.png")} alt="Luther Bell"/>
                    <h1 className="heading1">Home</h1>
                    <h3 className="heading3">See updates here</h3>
                </div>
                <p>Notifications</p>
                <div className="notifyCard">
                    <div className="notifyBorder">
                        {/* TODO: Populate the nofications from db notifications table */}
                        <Col className='notifyCol'>
                            <Fragment>
                            {this.state.requests && (
                                this.state.requests.map(request =>
                                    <Toast show={true} onClose={this.dismissNotification} key={request.notification_id}>
                                        <Toast.Header>
                                            <strong className="mr-auto">Request</strong>
                                            <small>from {request.offerer_email}</small>
                                        </Toast.Header>
                                        <Toast.Body>
                                            {/* Replace this with the message of the notification */}
                                            <p>This request is {request.status}.</p>
                                        </Toast.Body>
                                    </Toast>
                                )
                            )}
                            </Fragment>
                            {this.state.offers && (
                                this.state.offers.map(offer =>
                                    <Toast show={true} onClose={this.dismissNotification} key={offer.notification_id}>
                                        <Toast.Header>
                                            <strong className="mr-auto">Offer</strong>
                                            <small>from {offer.requester_email}</small>
                                        </Toast.Header>
                                        <Toast.Body>
                                            <p>Please approve or decline this request:</p>
                                            <Button variant="success" size="sm" onClick={() => this.sendMessage(offer.notification_id, "accepted")}>Approve</Button>
                                            <Button variant="danger" size="sm" onClick={() => this.sendMessage(offer.notification_id, "declined")}>Decline</Button>
                                        </Toast.Body>
                                    </Toast>
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
