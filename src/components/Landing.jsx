import React, { Fragment } from 'react';
import { Button, Col, Toast } from 'react-bootstrap';
import "./styles/Landing.css";

// This component handles the landing page, the page that the user sees once they log in.
// This page shows all requests and offers that are being with the user. The user has the option
// to declare the offers and requests as Done or Declined.

class Landing extends React.Component {

    // The constructor handles the props and the state which stores the requests and offers data.
    constructor(props) {
        super(props);
        this.state = { showModal: false,
                       requests: [],
                       offers: []
                     }
        this.fetchRequestNotifications = this.fetchRequestNotifications.bind(this);
        this.fetchOfferNotifications = this.fetchOfferNotifications.bind(this);
    }

    // Initial notifications, requests and offers, fetch
    componentDidMount = () => {
        this.fetchRequestNotifications();
        this.fetchOfferNotifications();
    };

    // It fetches all offers that are being made to the user, from the database on AWS using AWS Lambda API.
    // Then, the offers are stored in the state.
    fetchOfferNotifications = async () => {
        await fetch(`${global.selectAPI}table=Notifications&field=*&condition=offerer_email='${global.customAuth.email}'`, {
            method: "GET",
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            })
            .then(response => response.json())
            .then(data => this.setState({offers: data}));
    }

    // It fetches all requests that are being made to the user, from the database on AWS using AWS Lambda API.
    // Then, the requests are stored in the state.
    fetchRequestNotifications = async () => {
        await fetch(`${global.selectAPI}table=Notifications&field=*&condition=requester_email='${global.customAuth.email}'`, {
            method: "GET",
            headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
            })
            .then(response => response.json())
            .then(data => this.setState({requests: data}));
    }

    // It handles the 'Done' button click by updating the database and deleting the item if the user is 
    // the offerer.
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

        // Since the user is the owner, by clicking Done, the item is deleted, and 
        // the database is updated accordingly.
        if (global.customAuth.email === offererEmail) {
            fetch(`${global.deleteAPI}table=${itemTable}&condition=${itemIdName}='${itemId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))

            fetch(`${global.updateAPI}table=Notifications&field=offerer_status&value='done'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))
        } else {
            // Since the user is not the owner, by clicking Done, the item is not deleted, but
            // the database is updated accordingly.
            fetch(`${global.updateAPI}table=Notifications&field=requester_status&value='done'&condition=notification_id='${notificationId}'`, {
                method: "GET",
                headers: { 'x-api-key': process.env.REACT_APP_API_KEY, },
                })
                .then(response => console.log(response))
        }
        alert('The status of the deal is updated to done.')
        this.componentDidMount();
    }

    // It handles the 'Declined' button click by updating the database accordingly.
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
        this.componentDidMount();
    }

    // It populates the landing page with all pending requests and offers concerning the user. 
    // The user is also prompted to update the status of the deal by clicking Done or Declined.
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
                        <Col className='notifyCol'>
                            <Fragment>
                            {this.state.requests && (
                                this.state.requests.map(request =>
                                    <Fragment>
                                        {request.requester_status === 'pending' &&
                                        <Toast show={true} key={request.notification_id}>
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
                                            </Toast>
                                        }
                                    </Fragment>
                                )
                            )}
                            </Fragment>
                            {this.state.offers && (
                                this.state.offers.map(offer =>
                                    <Fragment>
                                        { offer.offerer_status === "pending" &&
                                        <Toast show={true} key={offer.notification_id}>
                                            <Toast.Header>
                                                <strong className="mr-auto">Request</strong>
                                                <small>from {offer.requester_email}</small>
                                            </Toast.Header>
                                            <Toast.Body>
                                                    <Fragment>
                                                        <p>Item: {offer.item_specs}</p>
                                                        <p>Please update the status of the transaction of the above item, once the deal is done or declined.</p>
                                                        <Button variant="success" size="sm" onClick={() => this.doneDeal(offer.offerer_email, offer.item_id, offer.item_table, offer.notification_id)}>Done</Button>
                                                        <Button variant="danger" size="sm" onClick={() => this.declinedDeal(offer.offerer_email, offer.notification_id)}>Declined</Button>
                                                    </Fragment>   
                                            </Toast.Body>
                                        </Toast>
                                        }           
                                    </Fragment>)
                                )}
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
