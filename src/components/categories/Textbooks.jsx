import React, { Fragment } from 'react';
import { Button, Form, Row, Modal, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";

// Custom imports
import './Listing.css';

const googleAPI = "https://www.googleapis.com/books/v1/volumes";

// Add objects parameter; list of lists (info for InfoCards)
class Textbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [],
                       bookOptions: [],
                       showModal: false,
                       showConfirmDelete: false,
                       API_KEY: "AIzaSyB5xY_lIKmpdwTI50kPz-UYiBDmyiSoc5M"}
        this.handleConfirmDeleteShow = this.handleConfirmDeleteShow.bind(this);
        this.handleConfirmDeleteClose = this.handleConfirmDeleteClose.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchBooks = this.fetchBooks.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    };

    // componentWillMount 

    componentDidMount = async () => {
        this.fetchBooks();
    };

    // fetchBooks: retrieves current listings from Textbooks table
    fetchBooks = async() => {
        await fetch(`${global.backendURL}/querytextbooks`)
        .then(response => response.json())
        .then(data => this.setState({ items: data }));
    };

    // fetchVolumeInfo: on selection of author, populate ISBN & Photo about that volume
    fetchVolumeInfo = async() => {
        let title = this.refs.textbook_title;
        if (title !== "undefined" && title.value !== "") {
            title = title.value;
            // Get & Display the Volume's ISBN # and Picture
            await fetch(`${googleAPI}?q=${title}&key=${this.state.API_KEY}`)
            .then(response => response.json())
            .then(data => this.setState({ bookOptions: data.items }));
        } else {
            alert("Please enter a title before searching Google Books.")
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
        // Check that the ref exists and title is not blank
        if (title !== "undefined" && title.value !== '') {
            let gbID = this.refs.GoogleBookID;
            // get info on title from Google Books
            console.log(`${googleAPI}/${gbID.value}?key=${this.state.API_KEY}`);
            let gbTitle;
            await fetch(`${googleAPI}/${gbID.value}?key=${this.state.API_KEY}`)
                            .then(response => response.json()
                            .then(data => gbTitle = data));
            let gbVolInfo = gbTitle.volumeInfo;
            console.log(gbVolInfo);
            let gbBookTitle = gbVolInfo.title;
            let gbBookAuthor = gbVolInfo.authors[0]; // There may be multiple authors!
            // let gbBookISBNs = gbVolInfo.industryIentifiers;
            let gbBookISBN = "XXX-X-XXX-XXXXX-X";
            // for (let isbnNum in gbBookISBNs) {
            //     if (isbnNum.identifier.type === "ISBN_13") {
            //         gbBookISBN = isbnNum.identifier.splice(3, 0, "-")
            //     }
            // }

            let gbBookImage = gbVolInfo.imageLinks.smallThumbnail;
            console.log(`"${gbBookTitle}", "${gbBookAuthor}", "${gbBookISBN}", "${global.customAuth.email}", "${gbBookImage}"`);

            // TODO: auto-populate author & ISBN, and grab photo from Google Books API
            // I think we need this to be an async function so we wait for the Promise to see if the data was saved properly.
            let rv = await fetch(`${global.backendURL}/query`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `INSERT INTO Textbooks (book_title, book_author, book_isbn, owner, book_image) VALUES ("${gbBookTitle}", "${gbBookAuthor}", "${gbBookISBN}", "${global.customAuth.email}", "${gbBookImage}")`,
                        }),
                  }).catch(error => {
                    console.error(error);
                });
            // Change this to alert user if their form was NOT submitted properly.
            if (rv.status !== 200) {
                alert("Uff da! Something went wrong, please try again.")
            } 
            // else {
            //     // Response was status 200 - OK  (Data was successfully saved)  
            //     this.handleModalClose();
            //     this.fetchBooks();
            // }
        } else {
            alert('Please provide a valid title.')
        }
    }

    sendRequest = async (owner, bookID) => {
        if (owner !== global.customAuth.email) {
            let response = await fetch(`${global.backendURL}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    query: `INSERT INTO Notifications (requester_email, offerer_email, item_id, source_table) VALUES ("${global.customAuth.email}", "${owner}", "${bookID}", "Textbooks");`,
                })
            })
            if (response.status !== 200) {
                alert("Uff da! Something went wrong, please try again.");
            } else {
                alert("Request successfully sent!")
            }
            console.log(response);
        } else {
            alert("You are the owner of this title. Please look for another title.")
        }
    }

    handleConfirmDeleteShow = () => {this.setState({showConfirmDelete: true})};
    handleConfirmDeleteClose = () => {this.setState({showConfirmDelete: false})};

    deleteItem = async () => {
        // Delete item from Database
        
    }

    render() {

        return (
            <Fragment>
                <Row>
                    <h1 className="categoryName">{this.props.sectionTitle}</h1>
                    {global.customAuth.isAuthenticated && (
                        <Button onClick={this.handleModalShow}>Add Listing</Button>
                    )}
                </Row>
                <p className="categoryDesc">Care to share or borrow a book?</p>
                <Row>
                    {typeof this.state.items !== "undefined" && (
                        // Retry Row and Col?
                        <MDBContainer>
                            <Row className="mdbpopoverDiv">
                                {this.state.items.map(item =>
                                    <MDBPopover
                                        placement="bottom"
                                        popover
                                        clickable
                                        key={item.book_id}
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
                                                { global.customAuth.email !== "" &&
                                                    ( item.owner !== global.customAuth.email
                                                        ? <Fragment>
                                                            <p className="p" ref="owner">{item.owner}</p>
                                                            <Button variant="success" size="sm" onClick={() => this.sendRequest(item.owner, item.book_id)}>Request</Button>
                                                        </Fragment>
                                                        : ( this.state.showConfirmDelete
                                                            ? <Fragment>
                                                                <p>Are you sure you want to delete this item?</p>
                                                                <Button variant="outline-secondary" size="sm" onClick={() => this.handleConfirmDeleteClose}>Cancel</Button>
                                                                <Button variant="danger" size="sm" onClick={() => this.deleteItem(item.id)}>Yes, Delete</Button>
                                                              </Fragment>
                                                            : <Button variant="danger" size="sm" onClick={() => this.handleConfirmDeleteShow}>Delete</Button>
                                                            )
                                                    )
                                                }
                                            </MDBPopoverBody>
                                        </div>
                                    </MDBPopover>
                                    //<InfoCard className="infoCard" image={item.book_image} title={item.book_title} author={item.book_author} course={item.course} loanPeriod={item.book_loan_period}/>
                                )}
                            </Row>
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
                                                <option value={bookOption.id} key={bookOption.id}>Author: {bookOption.volumeInfo.authors}&nbsp;Publisher: {bookOption.volumeInfo.publisher}&nbsp;&copy;{bookOption.volumeInfo.publishedDate}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                )}
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

export default Textbooks;
