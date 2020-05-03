import React, { Fragment } from 'react';
import { Button, Col, Form, ListGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn, MDBContainer } from "mdbreact";
import S3FileUpload from 'react-s3';
import emailjs from 'emailjs-com';

// Custom imports
import './styles/Listing.css';
require('dotenv').config()

const config = {
    bucketName: 'campus-share-files',
    dirName: 'Textbooks',
    region: 'us-east-2', // Ohio
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
};

const googleAPI = "https://www.googleapis.com/books/v1/volumes";
const googleAPIKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY

// Add objects parameter; list of lists (info for InfoCards)
class Textbooks extends React.Component {
    constructor(props) {
        super(props);
        // States set below: bookOptions, errMsg, file, fileURL, gbMsg
        this.state = { dataSent: false, fileLocalLocation: '', fileS3URL: '', items: [], showModal: false, uploadImage: false }
    };

    // It sends a request email to the offerer of the item, stating that the requester has requested it.
    // This function is invoked upon clicking request on any Textbook item.
    sendEmail = async(requester_emailId, offerer_emailId, item_id) => {
        var item_specs;
        let url = `${global.selectAPI}table=Textbooks&field=book_title,book_author&condition=book_id='${item_id}'`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => response.json())
        .then((json) => {
            item_specs = json;
        })
        .catch(err => alert(err));
        item_specs = `${item_specs[0].book_title} by ${item_specs[0].book_author}`;

        var template_params = {
            "offerer_email": offerer_emailId,
            "requester_email": requester_emailId,
            "item_specs": item_specs
        }
        var service_id = "default_service";
        var template_id = "item_request";

        emailjs.send(service_id, template_id, template_params, process.env.REACT_APP_EMAILJS_USER_ID_SECOND)
        .then(function(response) {
            console.log('Success!');
        }, function(error){
            console.log(error);
        });
        

        url = `${global.insertAPI}table=Notifications&field=requester_email,offerer_email,item_specs,item_id,item_table,offerer_status,requester_status&value='${requester_emailId}','${offerer_emailId}','${item_specs}', '${item_id}','Textbooks', 'pending', 'pending'`;
        await fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => console.log(response))

        alert('Request Successfully sent!');
    }

    componentDidMount = async () => {
        await this.fetchBooks();
    };

    // Delete book from Database
    deleteBook = async (book_id) => {
        await fetch(`${global.deleteAPI}table=Textbooks&condition=book_id=${book_id}`, {
                method: 'GET',
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                }
            })
            .then(response => response.json())
            .catch(err => console.log(err));
        this.fetchBooks();
    };

    // fetchBooks: retrieves current listings from Textbooks table
    fetchBooks = async () => {
        let url = `${global.selectAPI}table=Textbooks&field=*`;
        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
            }      
        })
        .then(response => response.json())
        .then(json => this.setState({ items: json }))
        .catch(err => alert(err));
    };

    // fetchVolumeInfo: on selection of author, populate ISBN & Photo about that volume
    fetchVolumeInfo = async() => {
        let title = this.refs.title.value;
        if (title) {
            // Get & Display the Volume's ISBN # and Picture
            await fetch(`${googleAPI}?q=${title}&key=${googleAPIKey}`)
            .then(response => response.json())
            .then(data => this.setState({ bookOptions: data.items }))
            .then(this.setState({gbMsg: "Please select a title below."}));
        } else {
            this.setState({gbMsg: "Please enter a title before searching Google Books."});
        }
    };

    // Set Proper States if a file is uploaded
    handleImageUpload = (event) => {
        if (event.target.files.length > 0) {
            this.setState({file:event.target.files[0], fileLocalLocation: URL.createObjectURL(event.target.files[0])})
        }
    }

    // Modal Functions 
    handleModalClose = () => {this.setState({showModal: false, dataSent: false, file: null, errMsg: null, fileLocalLocation: null, fileS3URL: null, fileURL: null, gbMsg: null, bookOptions: null, uploadImage: false})};
    handleModalShow = () => {this.setState({showModal: true})};

    // Sends book info from Add Listing Modal to DB & refreshes the component
    handleSubmit = async (event) => {
        let title = this.refs.title.value.replace("'", "");
        let author = this.refs.author.value.replace("'", "");
        let isbn = this.refs.isbn.value.replace("'", "");
        let loan_start = this.refs.loan_start.value;
        let loan_end = this.refs.loan_end.value;
        let course = this.refs.course.value.replace("'", "");
        // Check that the ref exists and title is not blank
        if (!title) {
            this.setState({errMsg: "Please provide a title for this book"});
        } else if (!author) {
            this.setState({errMsg: "Please provide an author for this book"});
        } else if (!isbn) {
            this.setState({errMsg: "Please provide an ISBN number for this book (check copyright page)"});
        } else if (!loan_start) {
            this.setState({errMsg: "Please provide a loan start for this book"});
        } else if (loan_end && (loan_end < loan_start)) {
            this.setState({errMsg: "Please provide a valid loan end (currently set to before start)"});
        } else if (!course) {
            this.setState({errMsg: "Please provide a course name for this book"})
        } else if (this.state.uploadImage && !this.state.fileLocalLocation) {
            this.setState({errMsg: "Please upload an image of your book or autopopulate with Google Books"});
        } else {
            this.setState({dataSent: true});
            this.setState({errMsg: null});
            let image_url;
            if (this.state.file) {
                await this.uploadToS3();
                image_url = this.state.fileS3URL;
            } else {
                image_url = this.state.fileURL;
            }

            // Save to DB
            let url = `${global.insertAPI}table=Textbooks&field=book_title,book_author,book_isbn,loan_start,loan_end,course,owner,book_image&value='${title}','${author}','${isbn}','${loan_start}','${loan_end}','${course}','${global.customAuth.email}','${image_url.replace(/&/g, 'AMPERSAND')}'`;
            console.log(url);
            await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-api-key': process.env.REACT_APP_API_KEY,
                    }
                })
                .then(response => console.log(response))
                .catch(err => this.setState({errMsg: err.message}));
            
            // Check for final Error Message
            if (!this.state.errMsg) {
                // Close Modal
                this.handleModalClose();
                // Update View
                this.fetchBooks();
            }
        }
    }

    // User Selects Search Option
    // populateFromGB: populate ref fields with search result
    populateFromGB = async (searchOption) => {
        //id
        //volumeInfo
          //title
          //subtitle?
          //authors
          //industryIdentifiers
            //type (ISBN_10, ISBN_13, OTHER)
          //imageLinks
            //thumbnail
        
        // Set Ref Values
        this.refs.title.value = searchOption.volumeInfo.title;
        this.refs.author.value = searchOption.volumeInfo.authors.join(', ');
        let isbn = null;
        for (let identifier of searchOption.volumeInfo.industryIdentifiers) {
            if (identifier.type === "ISBN_13") {
                isbn = identifier.identifier;
            }
        }
        this.refs.isbn.value = (isbn || "XXX-X-XXX-XXXXX-X")
        let image = searchOption.volumeInfo.imageLinks.thumbnail;
        this.setState({fileURL: image});
    }

    uploadToS3 = async () => {
        await S3FileUpload.uploadFile(this.state.file, config)
        .then(data => this.setState({fileS3URL: data.location}))
        .catch(err => this.setState({errMsg: err.message}));
    }

   
    render() {
        let header = (
            <Row>
                <h1 className="categoryName">{this.props.sectionTitle}</h1>
                {global.customAuth.isAuthenticated && (
                    <Button onClick={this.handleModalShow}>Add Listing</Button>
                )}
            </Row>
        );

        let loading = (
            <Fragment>
                &nbsp;
                <Spinner animation="border" size="md"/>
                &nbsp;Loading...
            </Fragment>
        );

        let cards = (
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
                                    <img className="listingImg" src={item.book_image.replace(/AMPERSAND/g, '&')||"https://cdn0.iconfinder.com/data/icons/reading-5/384/Generic_book_file_type-512.png"} alt="Thumbnail"/>
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
                                                <Button variant="success" size="sm" onClick={() => this.sendEmail(global.customAuth.email, item.owner, item.book_id)}>Request</Button>
                                                {/* <Button variant="success" size="sm" onClick={() => this.fetchBookInfo(item.book_id)}>Request</Button> */}
                                                </Fragment>
                                            : <Button variant="danger" size="sm" onClick={() => this.deleteBook(item.book_id)}>Delete</Button>
                                        )
                                    }
                                </MDBPopoverBody>
                            </div>
                        </MDBPopover>
                    )}
                </Row>
            </MDBContainer>
        );

        let modal = (
            <Modal size="xl" show={this.state.showModal} onHide={this.handleModalClose}>
                <Modal.Header closeButton>
                    {/* Change to Dropdown of possible listing categories? */}
                    <Modal.Title>Add a listing to {this.props.sectionTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" ref="title" placeholder="Enter Title Here" />
                        {/* version 1: click button to search for volume info */}
                        <Button variant="outline-secondary" onClick={this.fetchVolumeInfo}>
                            Autopopulate with Google Books
                        </Button>
                        <p>{this.state.gbMsg}</p>
                        {/* TODO: Make this search more visual & clear! (Change from SELECT) */}
                        {this.state.bookOptions && (
                            <Form.Group controlId="titleSelect">
                                <Form.Label>Select title</Form.Label>
                                <ListGroup horizontal className="horizontalScroll">
                                    {this.state.bookOptions !== null && this.state.bookOptions.map(bookOption =>
                                        <ListGroup.Item action onClick={(event) => {event.preventDefault(); this.populateFromGB(bookOption)}} id={bookOption.id} key={bookOption.id}>
                                            <div>
                                                <p>{bookOption.volumeInfo.title || "Title Not Listed"}</p>
                                                <p>{bookOption.volumeInfo.subtitle || ""}</p>
                                                {bookOption.volumeInfo.imageLinks
                                                  ? <img src={bookOption.volumeInfo.imageLinks.thumbnail} alt={bookOption.id}/>
                                                  : <img src="https://cdn0.iconfinder.com/data/icons/reading-5/384/Generic_book_file_type-512.png" className="uploadPreview" alt={bookOption.id}/>
                                                }
                                                {bookOption.volumeInfo.authors
                                                  ? <p>{bookOption.volumeInfo.authors.join(', ')}</p>
                                                  : <p>Author Not Listed</p>
                                                }
                                                <p>&copy;{bookOption.volumeInfo.publishedDate || "Publishing Date Not Listed"}</p>
                                            </div>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                        </Form.Group>
                        )}
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" ref="author"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control type="text" ref="isbn" placeholder="XXX-X-XXX-XXXXX-X"/>
                                </Form.Group>
                                {this.state.uploadImage
                                  ? <Fragment>
                                        <Form.Group>
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" required={false} onChange={this.handleImageUpload} accept="image/gif, image/jpeg, image/png"/>
                                            {this.state.fileLocalLocation !== null && (<img src={this.state.fileLocalLocation} alt="" className="uploadPreview"/>)}
                                        </Form.Group>
                                        <Button onClick={() => {this.setState({uploadImage: false, file: null, fileLocalLocation: null})}}>Cancel</Button>
                                    </Fragment>
                                  : <Button onClick={() => {this.setState({uploadImage: true})}}>Upload Custom Image</Button>
                                }
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Loan Start</Form.Label>
                                    <Form.Control type="date" ref="loan_start"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Loan End (Optional)</Form.Label>
                                    <Form.Control type="date" ref="loan_end"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control type="text" ref="course"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <p>{this.state.errMsg}</p>
                        {this.state.dataSent
                          ? <Fragment><Spinner/><p>Adding Listing...</p></Fragment>
                          : <Button variant="success" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        );

        return (
            <Fragment>
                {header}
                <p className="categoryDesc">Care to share or borrow a book?</p>
                <Row>
                    {typeof this.state.items === "undefined"
                     ? loading
                     : cards
                    }
                </Row>
                {modal}
            </Fragment>
        );
    }
}

export default Textbooks;
