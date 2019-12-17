// src/components/Profile.js

import React from "react"; //useState
import { Button } from "react-bootstrap"; // Modal
import { useAuth0 } from "../react-auth0-spa";
// import UserDetails_Modal from "./UserDetails_Modal";

import "./Profile.css";

const Profile = () => {
  // const [showModal, setShow] = useState(false);

  // function handleShow() {
  //   setShow(true);
  // };

  const { loading, user, logout } = useAuth0();

  // User info loading
  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  // No user: should not be able to see the profile page
  if (!user) {
      return(
        <p>Please log in to see the profile page</p>
      );
  }  

  // Regular user logged in: display info
  return (
    <div>
      <img className="profilePicture" src={user.picture} alt="User Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {/* <UserDetails_Modal closePhrase="Cancel" show={showModal} title="Edit your details!" user={user}/> */}
      {/* <Button onClick={handleShow()}>Edit Details</Button> */}
      <Button onClick={() => logout()}>Log out</Button>

      {/* User Details Modal */}
    </div>
  );
};

export default Profile;