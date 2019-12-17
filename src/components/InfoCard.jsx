import React from 'react';
import { Button, Col } from 'react-bootstrap';
import './InfoCard.css';

// TODO: Add Modal when InfoCard is clicked on (Beta Version)
class InfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  image: props.image,
                        title: props.title,
                        author: props.author,
                        course: props.course,
                        loanPeriod: props.loanPeriod,
                        shown: false
                    }
    }

    render() {
        return (
            <div className="infoCard">
                <div className="infoCardBorder">
                    <img className="infoCardImg" src={this.state.image} alt=""/>
                    <Col className='infoCardCol'>
                        <p className="p">{this.state.title}</p>
                        <p className="p">{this.state.author}</p>
                        <p className="p">{this.state.course}</p>
                        <p className="p">{this.state.loanPeriod}</p>
                    </Col>
                    <Button variant="success" size="sm">Request</Button>
                </div>
            </div>
        );
    }
}

export default InfoCard;