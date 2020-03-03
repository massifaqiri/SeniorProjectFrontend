import React, { Fragment } from 'react';
import { Button, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";
import "./Skill.css";

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [],
                       showModal: false}
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

    // fetchCar: retrieves current listings from Transport table
    fetchSkill = async() => {
        await fetch(`${backendURL}/queryskill`)
        .then(response => response.json())
        .then(data => this.setState({ items: data }));
    };

    // handleModalShow: shows the Add Listing Modal on button click 
    handleModalShow = () => {this.setState({showModal: true});};

    // handleModalClose: closes the Add Listing Modal on button click
    handleModalClose = () => {this.setState({showModal: false});};

    // handleSubmit: sends book info from Add Listing Modal to DB & refreshes the component
    handleSubmit = async (event) => {
        let title = this.refs.skill_title;
        // Check that the ref exists and title is not blank
        if (title !== "undefined" && title.value !== '') {            
            let rv = await fetch(`${backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Skill (skill_owner, skill_defition, car_email)`}),
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
                <h1 className="skill1">Skills</h1>
                <p className="sectionDesc">Care to share a skill?</p>
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
                                        key={item.skill_id}
                                        className="mdbpopover"
                                    >
                                        <MDBBtn className="skillBtn">
                                            <figure className="floatLeft">
                                                <figcaption>{item.skill_title}</figcaption>
                                            </figure>
                                        </MDBBtn>
                                        <div>
                                            <MDBPopoverHeader>{item.skill_title}</MDBPopoverHeader>
                                            <MDBPopoverBody>
                                                <p style={{display:"none"}} ref="skillId">{item.skill_id}</p>
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
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        {/* Change to Dropdown of possible listing categories? */}
                        <Modal.Title>Add a listing to {this.props.sectionTitle}</Modal.Title>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                {/* Refactor for generic listing (not just Textbooks) */}
                                <Form.Label>Owner</Form.Label>
                                <Form.Control type="text" ref="skill_owner" placeholder="Enter Name" />
                                <Form.Label>Definition of Skill</Form.Label>
                                <Form.Control type="text" ref="skill_definition" placeholder="Description Here" />
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