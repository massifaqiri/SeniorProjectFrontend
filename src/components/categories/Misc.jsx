import React, { Fragment } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from "mdbreact";

import Listing from './Listing';
import './Listing.css';

class Misc extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: []}
        this.fetchItems = this.fetchItems.bind(this);
    //     // this.deleteItem = this.deleteItem.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.sendRequest = this.sendRequest.bind(this);
    };

    componentDidMount(){this.fetchItems();}

    // fetchItems: retrieves current listings from Misc table
    fetchItems = async() => {
        await fetch(`${global.backendURL}/query`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `SELECT * FROM Misc WHERE owner!=${global.customAuth.email}`
            }),
        })
        .then(response => response.json())
        .then(object => this.setState({ items: object.data }));
        console.log(this.state.items);
    };

    // handleSubmit: sends info about new listing from Add Listing Modal to DB
        // let item_desc = this.refs.item_desc.value;
        // let imgURL = "";
        // let loan_deadline = this.refs.loan_deadline.value;
        // `INSERT INTO Misc (item_name, item_desc, item_img, item_loan_deadline) VALUES ("${item_name}", "${item_desc}", "${imgURL}", "${loan_deadline}")`,


    // sendRequest -> needs ID of item & source table

    // Render Page
    render() {

        return (
            <Listing categoryName="Misc"
                     categoryDesc="The Island of Misfit Toys, CampusShare-style"
                     tableName="Misc"
                     cards={this.state.items.map(item =>
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
                        )
                     }
                     modal={
                        <Fragment>
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
                            {/* TODO: Render Image Right Away! (Could be useful for Google Books Search, too!) */}
                            <p>Image Upload</p>
                            <input type="file" ref="item_image" accept="image/gif, image/jpeg, image/png" />
                            {/* Loan Period -- Start Date & Time to End Date & Time? "Any" Option? Permanent? */}
                            <p>Loan Period</p>
                        </Col>
                        </Fragment>
                     }>
                    
            </Listing>
        );
    }
}

export default Misc;
