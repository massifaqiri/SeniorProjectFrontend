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

    // Initial Notification Fetch
    componentDidMount = () => {this.fetchNotifications()};

    fetchNotifications = async () => {
        // Populate Request Notifications
        await fetch(`${backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `SELECT * from Notifications WHERE requester_email="${global.customAuth.email}" ORDER BY notification_id DESC`,
            }), })
            .then(response => response.json())
            .then(data => this.setState({requests: data.data}));

        // Populate Offer Notifications
        await fetch(`${backendURL}/query`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: `SELECT * from Notifications WHERE offerer_email="${global.customAuth.email}" ORDER BY notification_id DESC`,
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

    // Dismisses a notification
    // Either:
    //   set that specific Toast component's display to none
    //   mark as seen in DB?
    dismissNotification = () => {}

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
                                            {/* TODO: Add info on the request! Join Tables on item_id -- do we need to save the table name in a notification entry then??? */}
                                            { offer.status === "pending"
                                              ? (
                                                <Fragment>
                                                    <p>Please approve or decline this request:</p>
                                                    <Button variant="success" size="sm" onClick={() => this.sendMessage(offer.notification_id, "accepted")}>Approve</Button>
                                                    <Button variant="danger" size="sm" onClick={() => this.sendMessage(offer.notification_id, "declined")}>Decline</Button>
                                                </Fragment>
                                                )
                                              : (
                                                <p>You have {offer.status} this request.</p>
                                            )}    
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
