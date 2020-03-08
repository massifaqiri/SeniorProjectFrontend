import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

import Listing from './Listing';
import { uploadFile } from 'react-s3';

// Style
import './Listing.css';

class LostAndFound extends React.Component {
    // How does inheriting/changing functions work in Composition?
    // Just provide things through props sent to Listing below?
    // For database & table fields, can I pass in another component/class?

    handleSubmit = async () => {
        // Upload to S3
        let image = this.refs.image.files[0];
        console.log(image);
        await uploadFile(image, global.config)
        .then(data => console.log(data))
        .catch(err => console.error(`ERROR: ${err}`))

        // Save to DB

    }

    render() {
        return (
            <Listing categoryName="Lost & Found"
                     categoryDesc='Exception: "Lost time is never found again" - Benjamin Franklin'
                     form={
                        <Form onSubmit={this.handleSubmit}>
                            {/* Item Name */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Item Name</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="item_name" placeholder="..." />
                            </InputGroup>
                            {/* Location Found */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Location Found</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="location_found" placeholder="..." />
                            </InputGroup>
                            {/* Date & Time Found */}

                            {/* Image? */}
                            {/* <label className="custom-file-upload">
                                <input ref="image" type="file"/>
                            </label> */}
                            {/* Bootstrap File Upload */}
                            {/* <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                    Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    aria-describedby="inputGroupFileAddon01"
                                    ref="image"
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    Choose file
                                    </label>
                                </div>
                            </div> */}

                            <div className="input-group form-group">
                                <label className="input-group-btn">
                                    <span className="btn btn-leading">
                                        Add Photo <Form.Control as="input" type="file" className="invisible" multiple />
                                    </span>
                                </label>
                                <Form.Control as="input" type="text" className="form-control" defaultValue="No file selected" readOnly />
                            </div>
                            <Row className="bottomRow">
                                {/* <Col xs={4} sm={3} md={2} lg={2} xl={2}>
                                    <label className="btn btn-default btn-file">
                                        Browse <input type="file" className="invisible"/>
                                    </label>
                                </Col>
                                <Col xs={8} sm={9} md={7} lg={7} xl={7}>
                                    <p>No file selected</p>
                                </Col> */}
                                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                    <Button className="btn-submit" variant="success" type="submit">Add Listing</Button>
                                </Col>
                            </Row>
                        </Form>
                     }
            />
        )
    }
};

export default LostAndFound;