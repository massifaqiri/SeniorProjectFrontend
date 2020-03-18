import React, { Fragment } from 'react';
import { Button, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";
import "./Listing.css";

class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [],
                       showModal: false,
                       API_KEY: "AIzaSyB5xY_lIKmpdwTI50kPz-UYiBDmyiSoc5M"}
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchSkill = this.fetchSkill.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    };
    // componentWillMount 

    componentDidMount = async () => {
        this.fetchSkill();
    };

    // fetchSkill: retrieves current listings from Transport table
    fetchSkill = async() => {
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
        let skill_title = this.refs.skill_title.value;
        // Check that the ref exists and title is not blank
        if (skill_title !== '') {      
            let skill_description = this.refs.skill_description.value; 
            let rv = await fetch(`${global.backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Skill (skill_title, skill_description) VALUES ("${skill_title}", "${skill_description}")`,
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
                    <h1 className="skill1">Skills</h1>
                    {global.customAuth.isAuthenticated && (
                        <Button onClick={this.handleModalShow}>Add Listing</Button>
                    )}
                </Row>
                <p className="sectionDesc">Care to share a skill?</p>
                <Row>
                    {typeof this.state.items !== "undefined" && (
                        <MDBContainer>
                            <Row className="mdbpopoverDiv">
                                {this.state.items.map(item =>
                                    <MDBPopover
                                        placement="bottom"
                                        popover
                                        clickable
                                        key={item.skill_id}
                                        className="mdbpopover"
                                    >
                                        <MDBBtn className="listingBtn">
                                            <figure className="floatLeft">
                                                <figcaption>{item.skill_title}</figcaption>
                                            </figure>
                                        </MDBBtn>
                                        <div>
                                            <MDBPopoverHeader>{item.skill_title}</MDBPopoverHeader>
                                            <MDBPopoverBody>
                                                <p style={{display:"none"}} ref="skill_title">{item.skill_id}</p>
                                                <p className="p">{item.skill_description}</p>
                                                <p className="p" ref="owner">{item.owner}</p>
                                                <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.skill_id)}>Request</Button>
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
                        <Modal.Title>Add a listing to Skills</Modal.Title>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                {/* Refactor for generic listing (not just Textbooks) */}
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" ref="skill_title" placeholder="Enter Title" />
                                <Form.Label>Description of Skill</Form.Label>
                                <Form.Control type="text" ref="skill_description" placeholder="Description Here" />
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

export default Skill;