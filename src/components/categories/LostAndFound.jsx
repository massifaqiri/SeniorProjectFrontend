import React, { Fragment } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from "mdbreact";
import S3FileUpload from 'react-s3';
import emailjs from 'emailjs-com';

import './styles/Listing.css';

const config = {
    bucketName: 'campus-share-files',
    dirName: 'LostAndFound',
    region: 'us-east-2', // Ohio
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
};

class LostAndFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = { errMsg: null,
                       file: null,
                       fileLocation: null,
                       fileURL: null,
                       items: null,
                       showModal: false}
    }

    componentDidMount(){this.fetchItems();}

    deleteItem = async (item_id) => {
        await fetch(`${global.deleteAPI}table=LostAndFound&condition=item_id=${item_id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                }
            })
            .then(response => response.json())
            .catch(err => console.log(err));
        this.fetchItems();
    };

    // fetchItems: retrieves current listings from LostAndFound table
    fetchItems = async () => {
        await fetch(`${global.selectAPI}table=LostAndFound&field=*`, {
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
        let date_found = this.refs.date_found.value;
        let time_found = this.refs.time_found.value;
        let location_found = this.refs.location_found.value;
        let item_img = this.state.fileURL;
        if (!item_name) {
            this.setState({errMsg: "Please provide a name for this item"});
        } else if (!date_found) {
            this.setState({errMsg: "Please provide the day this item was found"});
        } else if (!time_found) {
            this.setState({errMsg: "Please provide the time this item was found"});
        } else if (!location_found) {
            this.setState({errMsg: "Please provide the location this item was found"});
        } else if (!item_img) {
            this.setState({errMsg: "Please provide an image of this item"});
        } else {
            this.setState({errMsg: null});
            // Upload to S3
            await this.uploadToS3();
    
            if (!this.state.errMsg) {
                // Save to DB
                await this.saveToDB(item_name, date_found, time_found, location_found, this.state.fileLocation);
                
                // Update View of Item Listings
                this.fetchItems();

                // Lastly, close the modal
                this.handleModalClose();
            }
        }
    }

    saveToDB = async(item_name, date_found, time_found, location_found, item_img) => {
        let url = `${global.insertAPI}table=LostAndFound&field=item_name,date_found,time_found,location_found,item_img,discoverer&value='${item_name}', '${date_found}', '${time_found}', '${location_found}', '${item_img}', '${global.customAuth.email}'`
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

    // It sends a request email to the discoverer of the item, stating that the requester has requested it.
    // This function is invoked upon clicking request on any Lost and Found item.
    sendEmail = async(requester_emailId, offerer_emailId, item_id) => {
        var item_specs;
        let url = `${global.selectAPI}table=LostAndFound&field=item_name,location_found&condition=item_id='${item_id}'`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => response.json())
        .then((json) => {
            item_specs = json;
        })
        .catch(err => alert(err));
        item_specs = `${item_specs[0].item_name} found at ${item_specs[0].location_found}`;

        var template_params = {
            "offerer_email": offerer_emailId,
            "requester_email": requester_emailId,
            "item_specs": item_specs
        }
        var service_id = "default_service";
        var template_id = "item_request";

        emailjs.send(service_id, template_id, template_params, process.env.REACT_APP_EMAILJS_USER_ID_SECOND)
        .then(function(response) {
            console.log('Success!');
        }, function(error){
            console.log(error);
        });
        
        url = `${global.insertAPI}table=Notifications&field=requester_email,offerer_email,item_specs,item_id,item_table,offerer_status,requester_status&value='${requester_emailId}','${offerer_emailId}','${item_specs}', '${item_id}','LostAndFound', 'pending', 'pending'`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => console.log(response))
        alert('Request Successfully sent!');
    }

    // Render Component
    render() {
        return (
            <Fragment>
                <Row>
                    <Col xs={8} sm={8} md={10} lg={10} xl={10}>
                        <h1 className="categoryName">Lost & Found</h1>
                    </Col>
                    <Col className="justify-content-md-end">
                        {/* Add Listing Button - Only shown if current user is logged in */}
                        { global.customAuth.isAuthenticated && (
                            <Button onClick={this.handleModalShow}>Add Listing</Button>
                            )}
                    </Col> 
                </Row>
                <p className="categoryDesc">Exception: "Lost time is never found again" - Benjamin Franklin</p>

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
                        ? // No Items exist
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
                                                <p className="p">{item.name}</p>
                                                <p className="p">Location Found: {item.location_found}</p>
                                                <p className="p">Date Found: {item.date_found.slice(0,10)}</p>
                                                <p className="p">Time Found: {item.time_found.slice(0,5)}</p>
                                                {global.customAuth.email !== '' && (
                                                    <Fragment>
                                                        {item.discoverer === global.customAuth.email
                                                        ? <Fragment>
                                                            <Button variant="danger" size="sm" onClick={() => this.deleteItem(item.item_id)}>Delete</Button>
                                                        </Fragment>
                                                        : <Fragment>
                                                            <p className="p" ref="owner">{item.discoverer}</p>
                                                            <Button variant="success" size="sm" onClick={() => this.sendEmail(global.customAuth.email, item.discoverer, item.item_id)}>Request</Button>
                                                        </Fragment>
                                                        }
                                                    </Fragment>
                                                )}
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
                            {/* Item Name */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Item Name</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="item_name" placeholder="Enter Name Here"/>
                            </InputGroup>
                            {/* Location Found */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Location Found</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="location_found" placeholder="Enter Location Here" />
                            </InputGroup>
                        </Col>
                        <Col>
                            {/* Date & Time Found */}
                            <input type="date" ref="date_found"/>
                            <input type="time" ref="time_found"/>
                            {/* Image */}
                            <p>Image Upload</p>
                            <input type="file" onChange={this.handleImageUpload} accept="image/gif, image/jpeg, image/png"/>
                            {this.state.fileURL !== null && (<img src={this.state.fileURL} alt="" className="uploadPreview"/>)}

                            <p>{this.state.errMsg}</p>

                            <Row className="bottomRow">
                                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                    <Button className="btn-submit" variant="success" onClick={this.handleSubmit}>Add Listing</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }
};

export default LostAndFound;