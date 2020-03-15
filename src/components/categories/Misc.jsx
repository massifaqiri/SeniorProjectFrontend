import React, { Fragment } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from "mdbreact";
import S3FileUpload from 'react-s3';

import './Listing.css';

const config = {
    bucketName: 'campus-share-files',
    dirName: 'Misc',
    region: 'us-east-2', // Ohio
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
};

class Misc extends React.Component {

    constructor(props) {
        super(props);
        this.state = { errMsg: null,
                       file: null,
                       fileLocation: null,
                       fileURL: null,
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

    deleteItem = async (item_id) => {
        await fetch(`${global.deleteAPI}table=Misc&condition=item_id=${item_id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                }
            })
            .then(response => response.json())
            .catch(err => console.log(err));
        this.fetchItems();
    };

    // fetchItems: retrieves current listings from Misc table
    fetchItems = async () => {
        await fetch(`${global.selectAPI}table=Misc&field=*`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }
        })
        .then(response => response.json())
        .then(object => this.setState({ items: object }));
    };

    handleImageUpload = (event) => {
        if (event.target.files.length > 0) {
            this.setState({file:event.target.files[0], fileURL: URL.createObjectURL(event.target.files[0])})
        }
    }

    // Modal Functions
    handleModalClose = () => {this.setState({showModal: false, file: null})};
    handleModalShow = () => {this.setState({showModal: true})};
    
    handleSubmit = async () => {
        let item_name = this.refs.item_name.value;
        let item_desc = this.refs.item_desc.value;
        let item_img = this.state.fileURL;
        let loan_start = this.refs.loan_start.value;
        let loan_end = this.refs.loan_end.value;
        if (!item_name) {
            this.setState({errMsg: "Please provide a name for this item"});
        } else if (!item_desc) {
            this.setState({errMsg: "Please provide a description for this item"});
        } else if (!item_img) {
            this.setState({errMsg: "Please provide an image for this item"});
        } else if (!loan_start) {
            this.setState({errMsg: "Please provide a loan start for this item"});
        } else if (loan_end && (loan_end < loan_start)) {
            this.setState({errMsg: "Please provide a valid loan end (currently set to before start)"});
        } else {
            this.setState({errMsg: null});
            // Upload to S3
            await this.uploadToS3();
    
            if (!this.state.errMsg) {
                // Save to DB
                await this.saveToDB(item_name, item_desc, this.state.fileLocation, loan_start, loan_end);
                
                // Update View of Item Listings
                this.fetchItems();

                // Lastly, close the modal
                this.handleModalClose();
            }
        }
    }

    saveToDB = async(item_name, item_desc, item_img, loan_start, loan_end) => {
        let url = `${global.insertAPI}table=Misc&field=item_name,item_desc,item_img,loan_start,loan_end,owner&value='${item_name}','${item_desc}','${item_img}','${loan_start}','${loan_end}','${global.customAuth.email}'`;
        await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    }
                })
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    uploadToS3 = async () => {
        await S3FileUpload.uploadFile(this.state.file, config)
        .then(data => this.setState({fileLocation: data.location}))
        .catch(err => this.setState({errMsg: err}));
    }


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
                                                    {item.owner === global.customAuth.email
                                                    ? <Fragment>
                                                        <Button variant="danger" size="sm" onClick={() => this.deleteItem(item.item_id)}>Delete</Button>
                                                      </Fragment>
                                                    : <Fragment>
                                                        <p className="p" ref="owner">{item.owner}</p>
                                                        <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.item_id)}>Request</Button>
                                                      </Fragment>
                                                    }
                                                </MDBPopoverBody>
                                            </div>
                                        </MDBPopover>
                                )}
                            </Fragment>
                        }
                    </Fragment>
                )}
                {/* Add Listing Modal */}
                <Modal show={this.state.showModal} onHide={this.handleModalClose} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new listing to the {this.props.categoryName} Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            <input type="file" onChange={this.handleImageUpload} accept="image/gif, image/jpeg, image/png" />
                            {this.state.fileURL !== null && (<img src={this.state.fileURL} alt="" className="uploadPreview"/>)}
                            
                            {/* Loan Period -- Start Date & Time to End Date & Time? "Any" Option? Permanent? */}
                            <p>Loan Period (Loan Start Required)</p>
                            <input type="date" ref="loan_start"/>
                            <input type="date" ref="loan_end"/>
                        </Col>

                        <p>{this.state.errMsg}</p>

                        <Row className="bottomRow">
                            <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                <Button className="btn-submit" variant="success" onClick={this.handleSubmit}>Add Listing</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
}

export default Misc;
