import React, { Fragment } from 'react';
import { Button, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";
import "./Transport.css";

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

class Transport extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [],
                       showModal: false}
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchCar = this.fetchCar.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    };

    // componentWillMount 

    componentDidMount = async () => {
        this.fetchCar();
    };

    // fetchCar: retrieves current listings from Transport table
    fetchCar = async() => {
        await fetch(`${backendURL}/querytransport`)
        .then(response => response.json())
        .then(data => this.setState({ items: data }));
    };

    // handleModalShow: shows the Add Listing Modal on button click 
    handleModalShow = () => {this.setState({showModal: true});};

    // handleModalClose: closes the Add Listing Modal on button click
    handleModalClose = () => {this.setState({showModal: false});};

    // handleSubmit: sends book info from Add Listing Modal to DB & refreshes the component
    handleSubmit = async (event) => {
        let title = this.refs.car_title;
        // Check that the ref exists and title is not blank
        if (title !== "undefined" && title.value !== '') {            
            let rv = await fetch(`${backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Transport (car_owner, car_make, car_model, car_destination, car_time, car_email)`}),
                  }).catch(error => {
                    console.error(error);
                });
            // Change this to alert user if their form was NOT submitted properly.
            if (rv.status !== 200) {
                alert("Uff da! Something went wrong, please try again.")
            } 
        } else {
            alert('Please provide a valid title.')
        }
    }

    sendRequest = async (owner, carID) => {
        if (owner !== this.state.user.email) {
            let rv = await fetch(`${backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `INSERT INTO Notifications (requester_email, offerer_email, item_id) VALUES ("${this.state.user.email}", "${owner}", "${carID}");`,
                })
            })
            if (rv.status !== 200) {
                alert("Uff da! Something went wrong, please try again.");
            } else {
                alert("Request successfully sent!")
            }
            console.log(rv);
        } else {
            alert("You are the owner of this title. Please look for another title.")
        }
    }

    render() {
        return (
            <Fragment>
                <h1 className="transport1">Transportation</h1>
                <p className="sectionDesc">Care to share a ride?</p>
                <Row>
                    <Button onClick={this.handleModalShow}>Add Listing</Button>
                </Row>
                <Row>
                    {typeof this.state.items !== "undefined" && (
                        // Retry Row and Col?
                        <MDBContainer>
                            <Row className="mdbpopoverDiv">
                                {this.state.items.map(item =>
                                    <MDBPopover
                                        placement="bottom"
                                        popover
                                        clickable
                                        key={item.ride_id}
                                        className="mdbpopover"
                                    >
                                        <MDBBtn className="rideBtn">
                                            <figure className="floatLeft">
                                                <figcaption>{item.ride_title}</figcaption>
                                            </figure>
                                        </MDBBtn>
                                        <div>
                                            <MDBPopoverHeader>{item.ride_title}</MDBPopoverHeader>
                                            <MDBPopoverBody>
                                                <p style={{display:"none"}} ref="rideId">{item.ride_id}</p>
                                                <p className="p" ref="owner">{item.owner}</p>
                                                <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.ride_id)}>Request</Button>
                                            </MDBPopoverBody>
                                        </div>
                                    </MDBPopover>
                                )}
                            </Row>
                        </MDBContainer>
                    )}
                    {typeof this.state.items === "undefined" && (
                        <Fragment>
                            &nbsp;
                            <Spinner animation="border" size="md"/>
                            &nbsp;Loading...
                        </Fragment>
                    )}
                </Row>

                {/* Add Title Modal */}
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        {/* Change to Dropdown of possible listing categories? */}
                        <Modal.Title>Add a listing to {this.props.sectionTitle}</Modal.Title>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                {/* Refactor for generic listing (not just Textbooks) */}
                                <Form.Label>Owner</Form.Label>
                                <Form.Control type="text" ref="car_owner" placeholder="Enter Owner" />
                                <Form.Label>Make and Model</Form.Label>
                                <Form.Control type="text" ref="car_make,car_model" placeholder="Enter Make and Model" />
                                <Form.Label>Where to</Form.Label>
                                <Form.Control type="text" ref="car_desintation" placeholder="Enter Destination" />
                                <Form.Label>When</Form.Label>
                                <Form.Control type="text" ref="car_time" placeholder="Enter Time" />
                                <Button variant="success" type="submit" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal.Header>

                </Modal>
            </Fragment>
        );
    }
}

export default Transport;