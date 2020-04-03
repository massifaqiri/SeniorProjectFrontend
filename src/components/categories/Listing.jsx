import React, { Fragment } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";

import "./Listing.css";

// Listing: Parent Component which Categories can inherit from
//  props must include:
//      categoryName    Name of the category page
//      categoryDesc    Short, one-line description or quote
//      tableName       Name of the associated table in the Database

class Listing extends React.Component {

    // Item Listing
    constructor(props) {
        super(props);
        this.state = { items: [], // to hold results from querying the DB table
                       showModal: false,
                       showConfirmDelete: false
                     };
        this.fetchItems = this.fetchItems.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleConfirmDeleteShow = this.handleConfirmDeleteShow.bind(this);
        this.handleConfirmDeleteClose = this.handleConfirmDeleteClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // Fetch Initial Items
    componentDidMount = async () => {this.fetchItems()};

    // Modal Functions
    handleModalClose = () => {this.setState({showModal: false})};
    handleModalShow = () => {this.setState({showModal: true})};
    handleConfirmDeleteClose = () => {this.setState({showConfirmDelete: false})};
    handleConfirmDeleteShow = () => {this.setState({showConfirmDelete: true})};

    // Add Item Listing
    handleSubmit = () => {
        // TODO: Take values of all fields from the form and fill in a new entry in the table

        // Add Upload to S3
        
    }

    // Retrieve Items in current category from DB
    fetchItems = async () => {
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `SELECT * FROM ${this.props.tableName}`,
            })
        })
        .then(response => response.json())
        .then(object => this.setState({ items: object.data }));
    }

    // Request Item: create new notifitaction
    requestItem = async (requester_email, offerer_email, item_id, source_table) => {
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                query: `INSERT INTO Notifications (requester_email, offerer_email, item_id, source_table) VALUES ("${requester_email}", "${offerer_email}", "${item_id}", "${source_table}");`,
            })
        })
        .then(response => response.json())
        .then(data => this.setState({ items: data }));
    }

    // Delete Item: remove item from DB; current user must be owner
    deleteItem = async () => {
        console.log("TODO: Delete item with call to backend");
    }


    // Render Page
    render() {
        return (
            <Fragment>
                <Row>
                    <Col xs={8} sm={8} md={10} lg={10} xl={10}>
                        <h1 className="categoryName">{this.props.categoryName}</h1>
                    </Col>
                    <Col className="justify-content-md-end">
                        {/* Add Listing Button - Only shown if current user is logged in */}
                        { global.customAuth.isAuthenticated && (
                            <Button onClick={this.handleModalShow}>Add Listing</Button>
                            )}
                    </Col>
                </Row>
                <p className="categoryDesc">{this.props.categoryDesc}</p>

                {/* Modal - seen when Add Listing Button is clicked*/}
                <Modal show={this.state.showModal} onHide={this.handleModalClose} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new listing to the {this.props.categoryName} Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Iterate though fields for DB table? */}
                        {this.props.form}
                    </Modal.Body>
                </Modal>

                {/* <Modal show={this.state.showConfirmDelete} onHide={this.handleConfirmDeleteClose} animation={false} centered size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.deleteItem}>
                            <p>Are you sure you want to delete this item?</p>
                            <Button variant="" onClick={this.handleConfirmDeleteClose}>Cancel</Button>
                            <Button variant="danger" type="submit">Yes, Delete</Button>
                        </Form>
                    </Modal.Body>
                </Modal> */}

                {/* Offerings Cards - Item Title, Image, Dates for Loan (Click for detail box & request button) */}
                <MDBContainer>
                    <Row className="mdbpopoeverRow">
                        {this.props.cards}
                    </Row>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default Listing;