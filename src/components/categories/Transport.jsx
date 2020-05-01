import React, { Fragment } from 'react';
import { Button, Form, Col, InputGroup, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from "mdbreact";
import emailjs from 'emailjs-com';

class Transport extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errMsg: null,
                       items: null,
                       showModal: false}
        this.fetchCar = this.fetchCar.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.sendRequest = this.sendRequest.bind(this);
    };
    // componentWillMount 
    
    componentDidMount(){this.fetchCar();}

    deleteItem = async (car_id) => {
        await fetch(`${global.deleteAPI}table=Transport&condition=car_id=${car_id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                }
            })
            .then(response => response.json())
            .catch(err => console.log(err));
        this.fetchCar();
    };

    // fetchCar: retrieves current listings from Transport table
    fetchCar = async () => {
        await fetch(`${global.selectAPI}table=Transport&field=*`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }
        })
        .then(response => response.json())
        .then(object => this.setState({ items: object }));
    };

    handleModalClose = () => {this.setState({showModal: false, file: null})};
    handleModalShow = () => {this.setState({showModal: true})};

    // Sends book info from Add Listing Modal to DB & refreshes the component
    handleSubmit = async () => {
        let car_title = this.refs.car_title.value;
        let car_make = this.refs.car_make.value;
        let car_model = this.refs.car_model.value;
        let car_desintation = this.refs.car_destination.value;
        let car_time = this.refs.car_time.value;
        if (!car_title) {
            this.setState({errMsg: "Please provide a title for this item"});
        } else if (!car_make) {
            this.setState({errMsg: "Please provide a make for this item"});
        } else if (!car_model) {
            this.setState({errMsg: "Please provide a model for this item"});
        } else if (!car_desintation) {
            this.setState({errMsg: "Please provide a destination for this item"});
        } else if (!car_time) {
            this.setState({errMsg: "Please provide a specific time)"});
        } else {
            this.setState({errMsg: null});
    
            if (!this.state.errMsg) {
                // Save to DB
                await this.saveToDB(car_title, car_make, car_model, car_desintation, car_time);
                
                // Update View of Item Listings
                this.fetchCar();

                // Lastly, close the modal
                this.handleModalClose();
            }
        }
    }

    saveToDB = async(car_title, car_make, car_model, car_desintation, car_time) => {
        let url = `${global.insertAPI}table=Transport&field=car_title,car_make,car_model,car_destination,car_time,owner&value='${car_title}','${car_make}','${car_model}','${car_desintation}','${car_time}','${global.customAuth.email}'`;
        await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    }
                })
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    sendEmail = async(requester_emailId, offerer_emailId, item_id) => {
        var item_specs;
        let url = `${global.selectAPI}table=Transport&field=car_destination,car_time&condition=car_id='${item_id}'`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => response.json())
        .then((json) => {
            item_specs = json;
            console.log("Test1", item_specs);
        })
        .catch(err => alert(err));
        item_specs = `${item_specs[0].car_destination} at ${item_specs[0].car_time}`;
        console.log("Test3", item_specs);
        var template_params = {
            "offerer_email": offerer_emailId,
            "requester_email": requester_emailId,
            "item_specs": item_specs
        }
        var service_id = "default_service";
        var template_id = "item_request";
        var user_id = 'user_2HoBuxXRZPsL1sOa71XLW';

        emailjs.send(service_id, template_id, template_params, user_id)
        .then(function(response) {
            console.log('Success!');
        }, function(error){
            console.log(error);
        });
        

        url = `${global.insertAPI}table=Notifications&field=requester_email,offerer_email,item_specs,item_id,item_table,offerer_status,requester_status&value='${requester_emailId}','${offerer_emailId}','${item_specs}', '${item_id}','Transport', 'pending', 'pending'`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => console.log(response))

        alert('Request Successfully sent!');
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col xs={8} sm={8} md={10} lg={10} xl={10}>
                        <h1 className="categoryName">Transportation</h1>
                    </Col>
                    <Col className="justify-content-md-end">
                        {/* Add Listing Button - Only shown if current user is logged in */}
                        { global.customAuth.isAuthenticated && (
                            <Button onClick={this.handleModalShow}>Add Listing</Button>
                            )}
                    </Col>
                </Row>
                <p className="categoryDesc">Care to share a ride?</p>
        
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
                                            key={item.car_id}
                                            className="mdbpopover"
                                        >
                                            <MDBBtn className="listingBtn">
                                                <figure className="floatLeft">
                                                    <img className="listingImg" src={"https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png"} alt="Placeholder"/>
                                                    <figcaption>{item.car_title}</figcaption>
                                                </figure>
                                            </MDBBtn>
                                            <div>
                                                <MDBPopoverHeader>{item.car_title}</MDBPopoverHeader>
                                                <MDBPopoverBody>
                                                    <p style={{display:"none"}} ref="itemID">{item.car_id}</p>
                                                    <p className="p">{item.car_title}</p>
                                                    <p className="p">{item.car_make}</p>
                                                    <p className="p">{item.car_model}</p>
                                                    <p className="p">{item.car_destination}</p>
                                                    <p className="p">{item.car_time}</p>
                                                    {global.customAuth.email !== '' && (
                                                        <Fragment>
                                                            {item.owner === global.customAuth.email
                                                            ? <Fragment>
                                                                <Button variant="danger" size="sm" onClick={() => this.deleteItem(item.car_id)}>Delete</Button>
                                                            </Fragment>
                                                            : <Fragment>
                                                                <p className="p" ref="owner">{item.owner}</p>
                                                                <Button variant="success" size="sm" onClick={() => this.sendEmail(global.customAuth.email, item.owner, item.car_id)}>Request</Button>
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
                        <Modal.Title>Add a new listing to the Transportation Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Name</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="car_title" placeholder="Enter Name Here" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Car Make</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="car_make" placeholder="Enter Make Here" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Car Model</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="car_model" placeholder="Enter Model Here" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Car Destination</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="car_destination" placeholder="Enter Destination Here" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Car Time</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="car_time" placeholder="Enter Time : 0000-00-00 " />
                            </InputGroup>
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

export default Transport;