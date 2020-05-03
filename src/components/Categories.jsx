import React from 'react';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import "./styles/Categories.css";

// This component handles the Categories page. It imports all categories icons from AWS S3 and renders them.
// The component divides the page into several rows and columns and fills them with categories, which
// are routed to their respective pages. 

class Categories extends React.Component {
    render() {
        return (
            <Container>
                <Row className="row">
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="https://www.luther.edu/" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/clothing.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Clothing</figcaption>
                            </figure>
                        </Nav.Link> 
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/events.png" className="categoryImg"/> 
                                <figcaption className="categoryFigcaption">Events</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/food.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Food</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/housing.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Housing</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link href="/lostandfound" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/lostfound.png" className="categoryImg"/> 
                                <figcaption className="categoryFigcaption">Lost & Found</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="https://www.xkcd.com/" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/meme.png" className="categoryImg"/> 
                                <figcaption className="categoryFigcaption">Meme</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/mentor.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Mentorship</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link href="/misc" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/umbrella.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Misc.</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/opportunities.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Opportunities</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/projects.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Projects</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link href="skill" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/skills.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Skills</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link disabled href="categories" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/social.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Social</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link href="textbooks" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/textbooks.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Textbooks</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                    <Col xs={4} sm={3} md={3} lg={2} xl={3}>
                        <Nav.Link href="transport" className="nounderline">
                            <figure className="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/transportation.png" className="categoryImg"/>
                                <figcaption className="categoryFigcaption">Transportation</figcaption>
                            </figure>
                        </Nav.Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Categories;