import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

import Listing from './Listing';
import S3FileUpload from 'react-s3';

// Style
import './Listing.css';

const config = {
    bucketName: 'campus-share-files',
    dirName: 'LostAndFound',
    region: 'us-east-2', // Ohio
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
};

class LostAndFound extends React.Component {
    // How does inheriting/changing functions work in Composition?
    // Just provide things through props sent to Listing below?
    // For database & table fields, can I pass in another component/class?

    constructor(props) {
        super(props);
        this.state = {file: null,
                      fileURL: null,
                      fileLocation: null,
                      errMsg: null};

    }

    handleImageUpload = (event) => {
        if (event.target.files.length > 0) {
            this.setState({file:event.target.files[0], fileURL: URL.createObjectURL(event.target.files[0])})
        }
    }

    handleSubmit = async () => {
        let item_name = this.refs.item_name.value;
        let datetime_found = this.refs.item_name.value;
        let location_found = this.refs.location_found.value;
        let item_img = this.state.fileURL;
        if (!item_name) {
            this.setState({errMsg: "Please provide a name for this item"});
        } else if (!datetime_found) {
            this.setState({errMsg: "Please provide the day and time this item was found"});
        } else if (!location_found) {
            this.setState({errMsg: "Please provide the location this item was found"});
        } else if (!item_img) {
            this.setState({errMsg: "Please provide an image of this item"});
        } else {
            this.setState({errMsg: null});
            // Upload to S3
            this.uploadToS3();
    
            if (!this.state.errMsg) {
                // Save to DB
                this.saveToDB(item_name, datetime_found, location_found, item_img);
                
                // Lastly, close the modal
            }
        }
    }

    uploadToS3 = async () => {
        await S3FileUpload.uploadFile(this.state.file, config)
        .then(data => this.setState({fileLocation: data.location}))
        .catch(err => this.setState({errMsg: err}));
    }

    saveToDB = async(item_name, datetime_found, location_found, item_img) => {
        await fetch(`${global.insertAPI}table=LostAndFound&field=item_name, datetime_found, location_found, item_img, discoverer&value='${item_name}', ${datetime_found}, '${location_found}', '${item_img}', '${global.customAuth.email}'`, {
                    method: 'GET',
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    }
                })
                .then(response => console.log(response))
                .catch(err => console.log(err));
        // await fetch(`${global.backendURL}/query`, {
        //     method: 'POST',
        //     body: `INSERT INTO LostAndFound (item_name, datetime_found, location_found, item_img) VALUES ('${item_name}', ${datetime_found}, '${location_found}', '${item_img}', '${global.customAuth.email}')`
        // })
    }

    render() {
        return (
            <Listing categoryName="Lost & Found"
                     categoryDesc='Exception: "Lost time is never found again" - Benjamin Franklin'
                     form={
                        <Form>
                            {/* Item Name */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Item Name</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="item_name" placeholder="..."/>
                            </InputGroup>
                            {/* Location Found */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Location Found</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="location_found" placeholder="..." />
                            </InputGroup>
                            {/* Date & Time Found */}
                            <input type="datetime-local"/>
                            {/* Image */}
                            <input type="file" onChange={this.handleImageUpload} accept="image/gif, image/jpeg, image/png" />
                            {this.state.fileURL !== null && (<img src={this.state.fileURL} alt="" className="uploadPreview"/>)}

                            <p>{this.state.errMsg}</p>

                            <Row className="bottomRow">
                                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                    <Button className="btn-submit" variant="success" onClick={this.handleSubmit}>Add Listing</Button>
                                </Col>
                            </Row>
                        </Form>
                     }
            />
        )
    }
};

export default LostAndFound;