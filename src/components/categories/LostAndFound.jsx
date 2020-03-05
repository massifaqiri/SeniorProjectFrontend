import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
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
                                <Form.Control type="text" ref="item_name" placeholder="Enter Name of Item Here" />
                            </InputGroup>
                            {/* Location Found */}
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>Location Found</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control type="text" ref="location_found" placeholder="Enter Name of Location Found Here" />
                            </InputGroup>
                            {/* Date & Time Found */}

                            {/* Image? */}
                            <label className="custom-file-upload">
                                <input ref="image" type="file"/>
                            </label>
                            <Button variant="success" type="submit">Add Listing</Button>
                        </Form>
                     }
            />
        )
    }
};

export default LostAndFound;