import React, { Fragment } from 'react';
import { Button, Col, Toast } from 'react-bootstrap';
import "./styles/Landing.css";
// import UserDetailsModal from './components/UserDetailsModal';

//const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

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
        // var item_table = this.state.requests[0].item_table;
        // var item_id = this.state.requests[0].item_id;
        // var item_name = this.returnItem(item_id, item_table)
        // console.log(item_table, item_id);
        // this.setState({requests: this.state.requests});
        // console.log("Current state", this.state);
    }

    returnItem = async(item_id, table) => {
        var itemName;
        if (table === 'Textbooks') {
            await fetch(`${global.selectAPI}table=Textbooks&field=book_title&condition=book_id='${item_id}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => response.json())
                .then(data => itemName = data);
        }
        itemName = JSON.stringify(itemName[0].book_title);
        console.log(itemName);
        return itemName;
    }

    // Sends an approval or decline message (notification)
    sendMessage = async (notificationId, status) => {
        console.log('Notification', notificationId);
        console.log('Status', status);
        if (status === 'accepted') {
            var favoriteTime = prompt('What are some time slots that you will be available to see the requester?');
            var favoriteLocation = prompt('What are some locations where you can see the requester?');
            await fetch(`${global.updateAPI}table=Notifications&field=meeting_datetime='${favoriteTime}',meeting_location='${favoriteLocation}',status&value='${status}'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            })
        } else if (status === 'done') {
            await fetch(`${global.updateAPI}table=Notifications&field=status&value='${status}'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            })
            // TODO: Delete the book here!!!!
        } else {
            await fetch(`${global.updateAPI}table=Notifications&field=status&value='${status}'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            }) 
        }
        this.fetchRequestNotifications();
        this.fetchOfferNotifications();
    }

    finalReply = async(notificationId) => {
        var favoriteTime = prompt('What are some time slots that you will be available to see the offeror?');
        var favoriteLocation = prompt('What are some locations where you can see the offeror?');
        await fetch(`${global.updateAPI}table=Notifications&field=favorite_datetime='${favoriteTime}',status='pending',favorite_location&value='${favoriteLocation}'&condition=notification_id='${notificationId}'`, {
            method: "GET",
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
        })
        this.fetchRequestNotifications();
        this.fetchOfferNotifications();
    }

    askToReschedule = async(notificationId) => {
        await fetch(`${global.updateAPI}table=Notifications&field=reschedule_sender='${global.customAuth.email}',status&value='rescheduled'&condition=notification_id='${notificationId}'`, {
            method: "GET",
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
        })
        this.fetchRequestNotifications();
        this.fetchOfferNotifications();
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
                                            {request.status==='accepted'
                                            ?
                                            <fragment>
                                            <p>This request is {request.status}.</p>
                                            <p>Pick a meeting time from {request.meeting_datetime}</p>
                                            <p>Pick a meeting location from {request.meeting_location}</p>
                                            <p>OR ask to reschedule</p>
                                            <Button variant="success" size="sm" onClick={() => this.finalReply(request.notification_id)}>Submit time & spot</Button>
                                            <Button variant="primary" size="sm" onClick={() => this.askToReschedule(request.notification_id)}>Ask to reschedule</Button>    
                                            </fragment>                                         
                                            :
                                            (
                                                request.status === 'rescheduled'
                                                ?
                                                (
                                                    request.reschedule_sender === global.customAuth.email
                                                    ?
                                                    <p>Your request for reschedule is pending!</p>
                                                    :
                                                    <fragment>
                                                        <p>The requester has asked you to reschedule. Please provide some new time slots.</p>
                                                        <Button variant="success" size="sm" onClick={() => this.finalReply(request.notification_id)}>Submit Time Slots</Button>
                                                    </fragment>
                                                )
                                                :
                                                <fragment>
                                                    <p>Item: </p>
                                                    <p>This request is {request.status}.</p>
                                                </fragment>
                                            )
                                            }
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
                                                offer.favorite_datetime 
                                                ?
                                                (<Fragment>
                                                    <p>Can you meet the requester at this time: {offer.favorite_datetime} and location: {offer.favorite_location}?</p>
                                                    <Button variant="success" size="sm" onClick={() => this.sendMessage(offer.notification_id, "done")}>Yes</Button>
                                                    <Button variant="primary" size="sm" onClick={() => this.askToReschedule(offer.notification_id)}>Ask to reschedule</Button>
                                                </Fragment>)
                                                :
                                                (<Fragment>
                                                    <p>Please approve or decline this request:</p>
                                                    <Button variant="success" size="sm" onClick={() => this.sendMessage(offer.notification_id, "accepted")}>Approve</Button>
                                                    <Button variant="danger" size="sm" onClick={() => this.sendMessage(offer.notification_id, "declined")}>Decline</Button>
                                                </Fragment>)
                                                )
                                              : (
                                                  offer.status === "rescheduled"
                                                  ?
                                                  (
                                                    offer.reschedule_sender === global.customAuth.email
                                                    ?
                                                    <p>Your request for reschedule is pending!</p>
                                                    :
                                                    <fragment>
                                                        <p>The requester has asked you to reschedule. Please provide some new time slots.</p>
                                                        <Button variant="success" size="sm" onClick={() => this.sendMessage(offer.notification_id, "accepted")}>Submit Time Slots</Button>
                                                    </fragment>
                                                    )
                                                  :
                                                <p>You have {offer.status} this request.</p>)
                                            }    
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
