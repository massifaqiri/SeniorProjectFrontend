import React from 'react';
import "./Categories.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Categories extends React.Component {

    render() {
        return (
            <Container>
                <Row className="row">
                    <Col>
                        <div>
                            <a href="https://www.luther.edu/">
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/clothing.png" className="categoryImg"/></a> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"} Clothings</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/events.png" className="categoryImg"/> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}    Events</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/food.png" className="categoryImg"/> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}      Food</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/housing.png" className="categoryImg"/> 
                        </div>
                        <p>{"\n"}{"\n"}{"\n"}{"\n"}Housing stuff</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/lostfound.png" className="categoryImg"/> 
                        </div>
                        <p>{"\n"}{"\n"}{"\n"}{"\n"}Lost & Found</p>
                    </Col>
                </Row>
                <Row className="row">
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/meme.png" className="categoryImg"/> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}    Meme</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/mentor.png" className="categoryImg"/> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}Mentorship</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/umbrella.png" className="categoryImg"/> 
                        </div>
                        <p>{"\n"} {"\n"} {"\n"} {"\n"}Miscellaneous</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/opportunities.png" className="categoryImg"/> 
                        </div>
                        <p>{"\n"} {"\n"} {"\n"} {"\n"}Opportunities</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/projects.png" className="categoryImg"/> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}    Projects</p>
                    </Col>
                </Row>
                <Row className="row">
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/skills.png" className="categoryImg"/> 
                        </div>
                        <p>{"\n"}{"\n"}{"\n"}{"\n"}      Skills</p>
                    </Col>
                    <Col className="col">
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/social.png" className="categoryImg"/> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}    Social</p>
                    </Col>
                    <Col>
                        <div>
                            <a href="textbooks"><Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/textbooks.png" className="categoryImg"/></a> 
                        </div>
                        <p> {"\n"} {"\n"} {"\n"} {"\n"}  Textbooks</p>
                    </Col>
                    <Col>
                        <div>
                            <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/transportation.png" className="categoryImg"/> 
                        </div>
                        <p>{"\n"}{"\n"}{"\n"}{"\n"}Transportation</p>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Categories;