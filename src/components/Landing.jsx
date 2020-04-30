import React, { Fragment } from 'react';
import { Button, Col, Toast } from 'react-bootstrap';
import "./styles/Landing.css";
// import UserDetailsModal from './components/UserDetailsModal';

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false,
                       requests: [],
                       offers: []
                     }
        this.fetchRequestNotifications = this.fetchRequestNotifications.bind(this);
        this.fetchOfferNotifications = this.fetchOfferNotifications.bind(this);
        this.dismissNotification = this.dismissNotification.bind(this);
    }

    // Initial Notification Fetch
    componentDidMount = () => {
        this.fetchRequestNotifications();
        this.fetchOfferNotifications();
    };

    fetchOfferNotifications = async () => {
        // Populate Request Notifications
        await fetch(`${global.selectAPI}table=Notifications&field=*&condition=offerer_email='${global.customAuth.email}'`, {
            method: "GET",
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            })
            .then(response => response.json())
            .then(data => this.setState({offers: data}));
        // console.log(this.state);
    }

    fetchRequestNotifications = async () => {
        // Populate Request Notifications
        await fetch(`${global.selectAPI}table=Notifications&field=*&condition=requester_email='${global.customAuth.email}'`, {
            method: "GET",
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            })
            .then(response => response.json())
            .then(data => this.setState({requests: data}));
    }

    doneDeal = (offererEmail, itemId, itemTable, notificationId) => {
        if (itemTable === 'Textbooks') {
            var itemIdName = 'book_id';
        } else if (itemTable === 'Misc') {
            var itemIdName = 'item_id';
        } else if (itemTable === 'Skill') {
            var itemIdName = 'skill_id';
        } else if (itemTable === 'Transport') {
            var itemIdName = 'car_id';
        }
        if (global.customAuth.email === offererEmail) {
            // Delete the item from the database
            fetch(`${global.deleteAPI}table=${itemTable}&condition=${itemIdName}='${itemId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))

            // Change notification status to done
            fetch(`${global.updateAPI}table=Notifications&field=offerer_status&value='done'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))
        } else {
            // Change notification status to done
            fetch(`${global.updateAPI}table=Notifications&field=requester_status&value='done'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))
        }
        alert('The status of the deal is updated to done.')
    }

    // Change notification status to declined
    declinedDeal = (offererEmail, notificationId) => {
        if (global.customAuth.email === offererEmail) {
            fetch(`${global.updateAPI}table=Notifications&field=offerer_status&value='declined'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))
        } else {
            fetch(`${global.updateAPI}table=Notifications&field=requester_status&value='declined'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))
        }
        alert('The status of the deal is updated to declined.')
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
                                        { request.requester_status === 'pending' &&
                                        <fragment>
                                            <Toast.Header>
                                                <strong className="mr-auto">Offer</strong>
                                                <small>from {request.offerer_email}</small>
                                            </Toast.Header>
                                            <Toast.Body>
                                                <Fragment>
                                                    <p>Item: {request.item_specs}</p>
                                                    <p>Please be on the lookout for an email from the offerer. Please update the status of the transaction of the above item, once the deal is done or declined.</p>
                                                    <Button variant="success" size="sm" onClick={() => this.doneDeal(request.offerer_email, request.item_id, request.item_table, request.notification_id)}>Done</Button>
                                                    <Button variant="danger" size="sm" onClick={() => this.declinedDeal(request.offerer_email, request.notification_id)}>Declined</Button>
                                                </Fragment>
                                            </Toast.Body>
                                        </fragment>
                                        }
                                    </Toast>
                                )
                            )}
                            </Fragment>
                            {this.state.offers && (
                                this.state.offers.map(offer =>
                                    <Toast show={true} onClose={this.dismissNotification} key={offer.notification_id}>
                                        { offer.offerer_status === "pending" &&
                                        <fragment>
                                            <Toast.Header>
                                                <strong className="mr-auto">Request</strong>
                                                <small>from {offer.requester_email}</small>
                                            </Toast.Header>
                                            <Toast.Body>
                                                {/* TODO: Add info on the request! Join Tables on item_id -- do we need to save the table name in a notification entry then??? */}
                                                    <Fragment>
                                                        <p>Item: {offer.item_specs}</p>
                                                        <p>Please update the status of the transaction of the above item, once the deal is done or declined.</p>
                                                        <Button variant="success" size="sm" onClick={() => this.doneDeal(offer.offerer_email, offer.item_id, offer.item_table, offer.notification_id)}>Done</Button>
                                                        <Button variant="danger" size="sm" onClick={() => this.declinedDeal(offer.offerer_email, offer.notification_id)}>Declined</Button>
                                                    </Fragment>   
                                            </Toast.Body>
                                        </fragment>
                                        }           
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
