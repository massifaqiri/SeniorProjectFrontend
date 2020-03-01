import React, { Fragment } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";


    // *Actual* listing component that all these others could extend?

// Listing: Parent Component which Categories can inherit from
//  props must include:
//      categoryName
//      categoryDesc (?)
//      db table name -- can iterate through fields for detail box?
class Listing extends React.Component {

    // Item Listing
    constructor(props) {
        super(props);
        this.state = { items: [], // to hold results from querying the DB table
                       showModal: false};
        this.fetchItems = this.fetchItems.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Fetch Initial Items
    componentDidMount = async () => {this.fetchItems()};

    // Modal Functions
    handleModalClose = () => {this.setState({showModal: false})};
    handleModalShow = () => {this.setState({showModal: true})};

    // Add Item Listing
    handleSubmit = () => {
        // TODO: Take values of all fields from the form and fill in a new entry in the table
    }

    // Retrieve Items in current category from DB
    fetchItems = async () => {
        // Will need to define the global api variable -- Need Massi's input on this
        // await fetch(`${global.api}`)
        // .then(response => response.json())
        // .then(data => this.setState({ items: data }));
    }

    // Render Page
    render() {
        return (
            <Fragment>
                <Row>
                    <h1 className="categoryName">{this.props.categoryName}</h1>
                    {/* Add Listing Button - Only shown if current user is logged in */}
                    { this.props.authenticated && (
                        <Button onClick={this.handleModalShow}>Add Listing</Button>
                    )}
                </Row>
                <p className="categoryDesc">{this.props.categoryDesc}</p>

                {/* Modal - seen when Add Listing Button is clicked*/}
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton />
                    <Modal.Title>Add a new listing to the {this.props.categoryName} Category</Modal.Title>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            {/* Iterate though fields for DB table? */}
                            <Button variant="success" type="submit">Add Listing</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Offerings Cards - Item Title, Image, Dates for Loan (Click for detail box & request button) */}
                <MDBContainer>
                    <Row className="mdbpopoeverRow">
                        { this.state.items.map(item =>
                            <MDBPopover
                                placement="bottom"
                                popover
                                clickable
                                key={item.book_id}
                                className="mdbpopover"
                            >
                                <MDBBtn className="listingBtn">
                                    <figure className="floatLeft">
                                        <img className="listingImg" src={item.img} alt={item.title}/>
                                        <figcaption>{item.title}</figcaption>
                                    </figure>
                                </MDBBtn>
                                <MDBPopoverHeader>{item.title}</MDBPopoverHeader>
                                <MDBPopoverBody>
                                    {/* Iterate through table fields here! render each as: <p className="p*>{field}</p> */}
                                    <Button variant="success" size="sm" onClick={() => {this.requestItem(item.owner, item.id)}}>Request</Button>
                                </MDBPopoverBody>
                            </MDBPopover>
                        )}
                    </Row>
                </MDBContainer>
            </Fragment>
        )
    }
}

export default Listing;