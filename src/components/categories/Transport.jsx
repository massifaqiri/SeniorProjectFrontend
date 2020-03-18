import React, { Fragment } from 'react';
import { Button, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";
import "./Listing.css";

class Transport extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [],
                       showModal: false,
                       API_KEY: "AIzaSyB5xY_lIKmpdwTI50kPz-UYiBDmyiSoc5M"}
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
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM Skill WHERE owner!=${global.customAuth.email}`
            })
        })
        .then(response => response.json())
        .then(response => console.log(response));
    };

    // handleModalShow: shows the Add Listing Modal on button click 
    handleModalShow = () => {this.setState({showModal: true});};

    // handleModalClose: closes the Add Listing Modal on button click
    handleModalClose = () => {this.setState({showModal: false});};

    // handleSubmit: sends book info from Add Listing Modal to DB & refreshes the component
    handleSubmit = async (event) => {
        let car_title = this.refs.car_title.value;
        // Check that the ref exists and title is not blank
        if (car_title !== '') {
            let car_make = this.refs.car_make.value;
            let car_model = this.refs.car_model.value;
            let car_destination = this.refs.car_destination.value;
            let car_time = this.refs.car_time.value;
            let rv = await fetch(`${global.backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Transport (car_title, car_make, car_model, car_destination, car_time) VALUES ("${car_title}", "${car_make}", "${car_model}, "${car_destination}", "${car_time}")`,
                        }),
                  }).catch(error => {
                    console.error(error);
                });
            // Change this to alert user if their form was NOT submitted properly.
            if (rv.status !== 200) {
                alert("Uff da! Something went wrong, please try again.")
            } 
        } else {
            alert('Please provide a valid entry.')
        }
    }

    sendRequest = async (owner, bookID) => {
        if (owner !== global.customAuth.email) {
            let rv = await fetch(`${global.backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `INSERT INTO Notifications (requester_email, offerer_email, item_id) VALUES ("${this.state.user.email}", "${owner}", "${bookID}");`,
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
                <Row>
                    <h1 className="transport1">Transportation</h1>
                    {global.customAuth.isAuthenticated && (
                        <Button onClick={this.handleModalShow}>Add Listing</Button>
                    )}
                </Row>
                <p className="sectionDesc">Care to share a ride?</p>
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
                                        key={item.car_id}
                                        className="mdbpopover"
                                    >
                                        <MDBBtn className="listingBtn">
                                            <figure className="floatLeft">
                                                <figcaption>{item.car_title}</figcaption>
                                            </figure>
                                        </MDBBtn>
                                        <div>
                                            <MDBPopoverHeader>{item.car_title}</MDBPopoverHeader>
                                            <MDBPopoverBody>
                                                <p style={{display:"none"}} ref="car_id">{item.car_id}</p>
                                                <p className="p">{item.car_title}</p>
                                                <p className="p">{item.car_make}</p>
                                                <p className="p">{item.car_model}</p>
                                                <p className="p" ref="owner">{item.owner}</p>
                                                <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.car_id)}>Request</Button>
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
                <Modal show={this.state.showModal} onHide={this.handleModalClose} size="lg" centered>
                    <Modal.Header closeButton>
                        {/* Change to Dropdown of possible listing categories? */}
                        <Modal.Title>Add a listing to Transportation</Modal.Title>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                {/* Refactor for generic listing (not just Textbooks) */}
                                <Form.Label>Owner</Form.Label>
                                <Form.Control type="text" ref="car_owner" placeholder="Enter Owner" />
                                <Form.Label>Make of Car</Form.Label>
                                <Form.Control type="text" ref="car_make" placeholder="Enter Make" />
                                <Form.Label>Model of Car</Form.Label>
                                <Form.Control type="text" ref="car_model" placeholder="Enter Model" />
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