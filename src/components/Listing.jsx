import React, { Fragment } from 'react';
import { Button, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";

// Custom imports
import './Listing.css';

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";
const googleAPI = "https://www.googleapis.com/books/v1/volumes?q=";

// Add objects parameter; list of lists (info for InfoCards)
class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [],
                       bookOptions: [],
                       showModal: false,
                       user: this.props.userData,
                       API_KEY: "AIzaSyB5xY_lIKmpdwTI50kPz-UYiBDmyiSoc5M"}
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchBooks = this.fetchBooks.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    };

    // componentWillMount 

    componentDidMount = async () => {
        this.fetchBooks();
    };

    // fetchBooks: retrieves current listings from Textbooks table
    fetchBooks = async() => {
        await fetch(`${backendURL}/querytextbooks`)
        .then(response => response.json())
        .then(data => this.setState({ items: data }));
    };

    // fetchVolumeInfo: on selection of author, populate ISBN & Photo about that volume
    fetchVolumeInfo = async() => {
        let title = this.refs.textbook_title;
        if (typeof title !== "undefined") {
            title = title.value;
            // Get & Display the Volume's ISBN # and Picture
            await fetch(`${googleAPI}${title}&key=${this.state.API_KEY}`)
            .then(response => response.json())
            .then(data => this.setState({ bookOptions: data.items }));
        }
    };

    // handleModalShow: shows the Add Listing Modal on button click 
    handleModalShow = () => {
        this.setState({showModal: true});
    };

    // handleModalClose: closes the Add Listing Modal on button click
    handleModalClose = () => {
        this.setState({showModal: false});
    };

    // handleSubmit: sends book info from Add Listing Modal to DB & refreshes the component
    handleSubmit = async (event) => {
        let title = this.refs.textbook_title;
        let gbID = this.refs.GoogleBookID;

        // get info on title from Google Books
        let gbTitle = await fetch(`${googleAPI}${gbID.value}&key=${this.state.API_KEY}`)
                          .then(response => response.json());
        console.log(gbTitle);

        let gbVolInfo = gbTitle.volumeInfo;
        let gbBookTitle = gbVolInfo.title;
        let gbBookAuthor = gbVolInfo.authors[0]; // There may be multiple authors!
        let gbBookISBNs = gbVolInfo.industryIentifiers;
        let gbBookISBN;
        if (gbBookISBNs[0].type === "ISBN_13") {
            gbBookISBN = gbBookISBN[0].identifier;
        } else {
            gbBookISBN = gbBookISBN[1].identifier;
        }
        let gbBookImage = gbVolInfo.imageLinks.thumbnail;

        event.preventDefault();

        // Check that the ref exists and title is not blank
        if (title !== '' && title.value !== '') {
            event.preventDefault();

            // TODO: auto-populate author & ISBN, and grab photo from Google Books API
            // I think we need this to be an async function so we wait for the Promise to see if the data was saved properly.
            let rv = await fetch(`${backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Textbooks (book_title, book_author, book_isbn, owner, book_image) VALUES ("${gbBookTitle}", "${gbBookAuthor}", "${gbBookISBN}", ${this.state.user.email}", "${gbBookImage}")`,
                        }),
                  })
            // Change this to alert user if their form was NOT submitted properly.
            if (rv.status !== 200) {
                alert("Uff da! Something went wrong, please try again.")
            } else {
                // Response was status 200 - OK  (Data was successfully saved)  
                this.handleModalClose();
                this.fetchBooks();
            }
        } else {
            alert('Please provide a valid title.')
        }
    }

    sendRequest = async (event, owner, bookID) => {
        let rv = await fetch(`${backendURL}/notifications`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                requester_email: this.state.user.email,
                offerer_email: owner,
                item_id: bookID,
            })
        })
        if (rv.status !== 200) {
            alert("Uff da! Something went wrong, please try again.");
        } else {
            alert("Request successfully sent!")
        }
        console.log(rv);
    }

    render() {

        return (
            <Fragment>
                <Row>
                    <h1 className="sectionTitle">{this.props.sectionTitle}</h1>
                    {typeof this.state.user !== "undefined" && (
                        <Button onClick={this.handleModalShow}>Add Listing</Button>
                    )}
                </Row>
                <p className="sectionDesc">Care to share or borrow a book?</p>
                <Row>
                    
                    {typeof this.state.items !== "undefined" && (
                        // Retry Row and Col?
                        <MDBContainer>
                            <div className="mdbpopoverDiv">
                                {this.state.items.map(item =>
                                    <MDBPopover
                                        placement="bottom"
                                        popover
                                        clickable
                                        id={item.isbn}
                                        className="mdbpopover"
                                    >
                                        <MDBBtn className="listingBtn">
                                            <figure className="floatLeft">
                                                <img className="listingImg" src={item.book_image||"https://cdn0.iconfinder.com/data/icons/reading-5/384/Generic_book_file_type-512.png"} alt={item.book_title}/>
                                                <figcaption>{item.book_title}</figcaption>
                                            </figure>
                                        </MDBBtn>
                                        <div>
                                            <MDBPopoverHeader>{item.book_title}</MDBPopoverHeader>
                                            <MDBPopoverBody>
                                                <p style={{display:"none"}} ref="bookID">{item.book_id}</p>
                                                <p className="p">{item.book_author}</p>
                                                <p className="p">{item.course}</p>
                                                <p className="p">{item.loanPeriod}</p>
                                                <p className="p" ref="owner">{item.owner}</p>
                                                <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.book_id)}>Request</Button>
                                            </MDBPopoverBody>
                                        </div>
                                    </MDBPopover>
                                    //<InfoCard className="infoCard" image={item.book_image} title={item.book_title} author={item.book_author} course={item.course} loanPeriod={item.book_loan_period}/>
                                )}
                            </div>
                        </MDBContainer>
                    )}
                    {typeof this.state.items === "undefined" && (
                        <Fragment>
                            &nbsp;
                            <Spinner animation="border" size="md"/>
                            &nbsp;Loading...
                        </Fragment>
                    )}
                </Row>

                {/* Add Title Modal */}
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        {/* Change to Dropdown of possible listing categories? */}
                        <Modal.Title>Add a listing to {this.props.sectionTitle}</Modal.Title>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                {/* Refactor for generic listing (not just Textbooks) */}
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" ref="textbook_title" placeholder="Enter Title Here" />
                                {/* version 1: click button to search for volume info */}
                                <Button variant="outline-secondary" onClick={this.fetchVolumeInfo}>
                                    Search for Title
                                </Button>
                                {this.state.bookOptions.length > 0 && (
                                    <Form.Group controlId="titleSelect">
                                        <Form.Label>Select title</Form.Label>
                                        <Form.Control ref="GoogleBookID" as="select">
                                            {this.state.bookOptions.map(bookOption =>
                                                // each option's value is the volume's id
                                                <option value={bookOption.id}>Author: {bookOption.volumeInfo.authors}&nbsp;Publisher: {bookOption.volumeInfo.publisher}&nbsp;&copy;{bookOption.volumeInfo.publishedDate}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                )}
                                {/* TODO: Auto Populate Author */}
                                {/* TODO: Auto Populate ISBN */}
                                {/* TODO: Auto Populate Book Image */}
                                <Button variant="success" type="submit" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal.Header>

                </Modal>
            </Fragment>
        );
    }
}

export default Listing;
