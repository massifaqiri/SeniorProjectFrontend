// src/components/Profile.js

import React, { useState } from "react"; //useState
import { Button } from "react-bootstrap"; // Modal
// import UserDetails_Modal from "./UserDetails_Modal";

import "./Profile.css";

const backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";

const Profile = (props) => {
  
  let email = "";

  const [showModal, setShow] = useState(false);

  function handleShow() {
    fetchUserData(email);
    setShow(true);
  };

  function handleClose() {
    setShow(false);
  };

  const saveChanges = async() => {
    // to determine if an update to the database is necessary:
    // check values of current selections against userdata variable
    handleClose();
  }

  // Retrieve current user data from DB and store in userdata
  let userdata;
  async function fetchUserData(user_email) {
    await fetch(`${backendURL}/userdata`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          email: user_email
      })
    })
    .then(response => response.json())
    .then(data => userdata = data);
  } 

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
  let majors_options = [];
  for (var i = 0; i < majors.length; i++) {
      majors_options.push(<option key={majors[i]}>{majors[i]}</option>)
  }
};

export default Profile;