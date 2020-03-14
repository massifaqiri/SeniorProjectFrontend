import React, { Fragment } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from "mdbreact";

import './Listing.css';

class Misc extends React.Component {

    constructor(props) {
        super(props);
        this.state = { file: null,
                       items: null,
                       showModal: false}
        this.fetchItems = this.fetchItems.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        // this.deleteItem = this.deleteItem.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.sendRequest = this.sendRequest.bind(this);
    };

    componentDidMount(){this.fetchItems();}

    // fetchItems: retrieves current listings from Misc table
    fetchItems = async() => {
        await fetch(`${global.selectAPI}table=Misc&field=*`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }
        })
        .then(response => response.json())
        .then(object => this.setState({ items: object }));
    };

    handleImageUpload = (event) => {this.setState({file: URL.createObjectURL(event.target.files[0])})}

    // Modal Functions
    handleModalClose = () => {this.setState({showModal: false, file: null})};
    handleModalShow = () => {this.setState({showModal: true})};
    
    // handleSubmit: sends info about new listing from Add Listing Modal to DB
        // let item_desc = this.refs.item_desc.value;
        // let imgURL = "";
        // let loan_deadline = this.refs.loan_deadline.value;
        // `INSERT INTO Misc (item_name, item_desc, item_img, item_loan_deadline) VALUES ("${item_name}", "${item_desc}", "${imgURL}", "${loan_deadline}")`,


    // sendRequest -> needs ID of item & source table

    // Render Page
    render() {
        return (
            <Fragment>
                <Row>
                    <Col xs={8} sm={8} md={10} lg={10} xl={10}>
                        <h1 className="categoryName">Misc</h1>
                    </Col>
                    <Col className="justify-content-md-end">
                        {/* Add Listing Button - Only shown if current user is logged in */}
                        { global.customAuth.isAuthenticated && (
                            <Button onClick={this.handleModalShow}>Add Listing</Button>
                            )}
                    </Col>
                </Row>
                <p className="categoryDesc">mi-sə-ˈlā-nē-əs: consisting of many things of different sorts</p>
        
                {!this.state.items
                // No items have been fetched yet
                ? (
                    <Row>
                        <Spinner animation="grow" size="sm" />
                        <p>Loading...</p>
                    </Row>
                )
                : (
                    <Fragment>
                        {this.state.items.length === 0
                         ? // No items exist
                            (<p>No items to display!</p>)
                         : // Render Items
                            <Fragment>
                                {this.state.items.map(item => 
                                    <MDBPopover
                                            placement="bottom"
                                            popover
                                            clickable
                                            key={item.item_id}
                                            className="mdbpopover"
                                        >
                                            <MDBBtn className="listingBtn">
                                                <figure className="floatLeft">
                                                    <img className="listingImg" src={item.item_img||"https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png"} alt={item.item_name}/>
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
                                )}
                            </Fragment>
                        }
                    </Fragment>
                )}
                {/* Modal - seen when Add Listing Button is clicked*/}
                <Modal show={this.state.showModal} onHide={this.handleModalClose} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new listing to the {this.props.categoryName} Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Iterate though fields for DB table? */}
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Item Name</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="item_name" placeholder="Enter Name Here" />
                            </InputGroup>
                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>Description:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control as="textarea" rows="3" ref="item_desc" placeholder="Please describe your item here" />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <p>Image Upload</p>
                            <input type="file" ref={this.state.fileInput} onChange={this.handleImageUpload} accept="image/gif, image/jpeg, image/png" />
                            {this.state.file !== null && (<img src={this.state.file} alt="" className="uploadPreview"/>)}
                            {/* Loan Period -- Start Date & Time to End Date & Time? "Any" Option? Permanent? */}
                            <p>Loan Period</p>
                        </Col>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

export default Misc;
