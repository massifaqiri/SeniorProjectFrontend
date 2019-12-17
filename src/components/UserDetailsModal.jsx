import React, { useState, Fragment } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-spa";


export default function UserDetailsModal(props) {
    const { user } = useAuth0();

    const [showModal, setShow] = useState(props.show);
    const [showLater, setLater] = useState(false);

    const handleLater = () => {
        handleClose();

        // Home Screen Alert Handling
        if (props.closePhrase === "Later") {
            setLater(true);
            //alert();
        }
        
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleLaterClose = () => {
        setLater(false);
    }

    // TODO: send POST request to server to add user info to db
    const saveChanges = () => {
        console.log(`Saving data for ${user.name} (db key: ${user.email})`);
        handleClose();
    }

    // TODO: webscrape https://www.luther.edu/catalog/curriculum/ for the current majors & minors!
    // Also include "Undeclared" (and "Custom"/"Individualized")?
    let majors = ["Accounting", "Africana Studies", "Allied Health Sciences", "Anthropology", "Art", 
                  "Biblical Languages", "Biology",
                  "Chemistry", "Classics", "Communication Studies", "Computer Science",
                  "Data Science",
                  "Economics", "Elementary Education", "English", "Environmental Studies", "Exercise Science", 
                  "French",
                  "German",
                  "Health Promotion",
                  "History",
                  "International Studies",
                  "Management", "Mathematics", "Mathematics/Statistics", "Music"," Music education",
                  "Neuroscience", "Nordic Studies", "Nursing", 
                  "Philosophy", "Physics", "Political science", "Psychology",
                  "Religion",
                  "Social work", "Sociology", "Spanish",
                  "Theatre",
                  "Visual Communication",
                  "Women and Gender Studies"]

    // there must be a better way...webscrape?
    //let minors = [Africana studies, anthropology, applied leadership studies, art, art history, biology, chemistry, Chinese studies, classics, classical studies, communication studies, computer science, dance, data science, economics, English, English writing, environmental science, environmental studies, exercise science, French, German, health promotion, history, international business, international studies, journalism, linguistics, management, mathematics, museum studies, music, musical theatre, Nordic studies, philosophy, physics, psychology, religion, secondary education, social welfare, sociology, Spanish, theatre, visual communication, women and gender studies, and K–12 teaching of art]
    
    let majors_options = [];
    for (var i = 0; i < majors.length; i++) {
        majors_options.push(<option key={majors[i]}>{majors[i]}</option>)
    }

    return (
        <Fragment>
            <Modal show={showModal} onHide={handleLater} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                {/* Add the fields for info (majors, minors, areas of interest) */}
                <Modal.Body>
                    <p>Help us tailor your recommendations based on your academic interests:</p>
                    {/* TODO: Display any pre-existing majors for the user */}
                    {/* i.e. create three boxes/bubbles for displaying selected majors */}
                    <Form.Group controlId="select_majors">
                        <Form.Label>Major #1</Form.Label>
                        <Form.Control as="select">
                            <option>undeclared</option>
                            {majors_options}
                        </Form.Control>
                    </Form.Group>
                    {/* Up to 3 minors (or multiple select for interested fields?) */}
                    <Form.Group controlId="select_minors">
                        <Form.Label>Minor #1</Form.Label>
                        <Form.Control as="select">
                            <option key="undeclared">undeclared</option>
                            {/* TODO: Auto-populate with minor options */}
                        </Form.Control>
                    </Form.Group>
                    {/* TODO: Add Interest Fields (Listing Categories/additional departments?) */}
                    <Form.Label>Graduation Year</Form.Label>
                    <Form.Control placeholder="YYYY"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button vairant="secondary" onClick={handleLater}>
                        {props.closePhrase}
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showLater} onHide={handleLaterClose} animation={false}>
                <Modal.Header closeButton>
                    <p>Change your details anytime on your profile.</p>
                    <p>Access by clicking your name in the upper right hand corner.</p>
                </Modal.Header>
            </Modal>
        </Fragment>
    )
}