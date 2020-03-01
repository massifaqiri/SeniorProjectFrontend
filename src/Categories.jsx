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
                        <a href="https://www.luther.edu/" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/clothing.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Clothing</figcaption>
                            </figure>
                        </a> 
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/events.png" className="categoryImg"/> 
                                <figcaption class="categoryFigcaption">Events</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/food.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Food</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/housing.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Housing</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/lostfound.png" className="categoryImg"/> 
                                <figcaption class="categoryFigcaption">Lost & Found</figcaption>
                            </figure>
                        </a>
                    </Col>
                </Row>
                <Row className="row">
                    <Col>
                        <a href="https://www.xkcd.com/" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/meme.png" className="categoryImg"/> 
                                <figcaption class="categoryFigcaption">Meme</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/mentor.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Mentorship</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/umbrella.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Misc.</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/opportunities.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Opportunities</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/projects.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Projects</figcaption>
                            </figure>
                        </a>
                    </Col>
                </Row>
                <Row className="row">
                    <Col>
                        <a href="skill" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/skills.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Skills</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col className="col">
                        <a href="categories" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/social.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Social</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="textbooks" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/textbooks.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Textbooks</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                        <a href="transport" className="nounderline">
                            <figure class="categoryFigure">
                                <Image src="https://campus-share-files.s3.us-east-2.amazonaws.com/transportation.png" className="categoryImg"/>
                                <figcaption class="categoryFigcaption">Transportation</figcaption>
                            </figure>
                        </a>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Categories;