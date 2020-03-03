import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Listing from './Listing';

import './Listing.css';

class LostAndFound extends React.Component {
    // How does inheriting/changing functions work in Composition?
    // Just provide things through props sent to Listing below?
    // For database & table fields, can I pass in another component/class?

    render() {
        return (
            <Listing categoryName="Lost & Found"
                     categoryDesc='Exception: "Lost time is never found again" - Benjamin Franklin'>
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
            </Listing>
        )
    }
};

export default LostAndFound;