import React, { Fragment } from 'react';
import { Button, Col, Form, InputGroup, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";

import './Listing.css';

class Misc extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [],
                       bookOptions: [],
                       showModal: false,
                       API_KEY: "AIzaSyB5xY_lIKmpdwTI50kPz-UYiBDmyiSoc5M"}
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchItems = this.fetchItems.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    };

    componentDidMount = async () => {this.fetchItems()};

    // fetchItems: retrieves current listings from Misc table
    fetchItems = async() => {
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM Misc WHERE owner!=${global.customAuth.email}`
            })
        })
        .then(response => response.json())
        .then(response => console.log(response));
    };

    // handleModalShow: shows the Add Listing Modal on button click 
    handleModalShow = () => {this.setState({showModal: true})};

    // handleModalClose: closes the Add Listing Modal on button click
    handleModalClose = () => {this.setState({showModal: false});};

    // handleSubmit: sends info about new listing from Add Listing Modal to DB
    handleSubmit = async (event) => {
        let item_name = this.refs.item_name.value;
        if (item_name !== '') {
            let item_desc = this.refs.item_desc.value;
            let imgURL = "";
            let loan_deadline = this.refs.loan_deadline.value;
            let rv = await fetch(`${global.backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Misc (item_name, item_desc, item_img, item_loan_deadline) VALUES ("${item_name}", "${item_desc}", "${imgURL}", "${loan_deadline}")`,
                        }),
                  }).catch(error => {
                    console.error(error);
                });
            // Change this to alert user if their form was NOT submitted properly.
            if (rv.status !== 200) {
                alert("Uff da! Something went wrong, please try again.")
            } 
            else {
                // Response was status 200 - OK  (Data was successfully saved)  
                this.handleModalClose();
            }
        } else {
            alert('Please provide a name for your offering.')
        }
    }

    sendRequest = async (owner, bookID) => {
        if (owner !== global.customAuth.email) {
            let rv = await fetch(`${global.backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `INSERT INTO Notifications (requester_email, offerer_email, item_id) VALUES ("${global.customAuth.email}", "${owner}", "${bookID}");`,
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

    // Render Page
    render() {

        return (
            <Fragment>
                <Row>
                    <h1 className="sectionTitle">Misc Page</h1>
                    {global.customAuth.isAuthenticated && (
                        <Button onClick={this.handleModalShow}>Add Listing</Button>
                    )}
                </Row>
                <p className="sectionDesc">The Island of Misfit Toys, CampusShare-style</p>
                <Row>
                    {typeof this.state.items !== "undefined" && (
                        <MDBContainer>
                            <Row className="mdbpopoverDiv">
                                {this.state.items.map(item =>
                                    <MDBPopover
                                        placement="bottom"
                                        popover
                                        clickable
                                        key={item.item_name}
                                        className="mdbpopover"
                                    >
                                        <MDBBtn className="listingBtn">
                                            <figure className="floatLeft">
                                                <img className="listingImg" src={item.item_img||"https://cdn0.iconfinder.com/data/icons/reading-5/384/Generic_book_file_type-512.png"} alt={item.book_title}/>
                                                <figcaption>{item.item_name}</figcaption>
                                            </figure>
                                        </MDBBtn>
                                        <div>
                                            <MDBPopoverHeader>{item.item_name}</MDBPopoverHeader>
                                            <MDBPopoverBody>
                                                <p style={{display:"none"}} ref="itemID">{item.item_id}</p>
                                                <p className="p">{item.item_desc}</p>
                                                <p className="p">{item.loan_period}</p>
                                                <p className="p" ref="owner">{item.owner}</p>
                                                <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.item_id)}>Request</Button>
                                            </MDBPopoverBody>
                                        </div>
                                    </MDBPopover>
                                    //<InfoCard className="infoCard" image={item.book_image} title={item.book_title} author={item.book_author} course={item.course} loanPeriod={item.book_loan_period}/>
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
                        <Modal.Title>Add a listing to Misc</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Item Name</InputGroup.Text></InputGroup.Prepend>
                                        <Form.Control type="text" ref="item_name" placeholder="Enter Name Here" />
                                    </InputGroup>
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control as="textarea" rows="3" ref="item_desc" placeholder="Please describe your item here" />
                                </Col>
                                <Col>
                                    {/* TODO: Render Image Right Away! (Could be useful for Google Books Search, too!) */}
                                    <p>Image Upload</p>
                                    <input type="file" ref="item_image" accept="image/gif, image/jpeg, image/png" />
                                    {/* Loan Period -- Start Date & Time to End Date & Time? "Any" Option? Permanent? */}
                                    <p>Loan Period</p>
                                </Col>
                            </Row>
                            <Button variant="success" type="submit" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}

export default Misc;
