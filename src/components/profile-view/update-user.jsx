import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateUser = ({ user, setUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    Fullname: user.Fullname,
    Username: user.Username,
    Password: user.Password,
    Email: user.Email,
    Birthday: user.Birthday,
    // Add more fields as needed
  });

  const handleUpdate = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate age
    const birthDate = new Date(updatedUser.Birthday);
    if (isNaN(birthDate)) {
      alert("Invalid date. Please enter the date in the format YYYY-MM-DD.");
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check age restriction
    if (age < 13) {
      alert("You must be at least 13 years old to update your profile.");
      return;
    }
    // Make API request to update user
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        setUpdateMessage("User updated successfully");
        console.log("User updated successfully:", updatedUserData);
        window.alert("User updated successfully"); // Add this line
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");
    fetch(
      `https://ajmovies-fc7e7627ec3d.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your account has been deleted");
      } else {
        alert("something went wrong.");
      }
    });
  };

  const [updateMessage, setUpdateMessage] = useState("");
  return (
    <>
      <h4>Update User</h4>
       <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Fullname:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.Fullname}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter Full Name"
          />
        </Form.Group>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.Username}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            defaultValue=""
            onChange={(e) => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Password must be 8 or more characters"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            defaultValue={user.Email} // This is a controlled component
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter an email address"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="birthday"
            name="Birthday"
            defaultValue={user.Birthday} // This is a controlled component
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Birthday"
          />
        </Form.Group>

        {/* Add more Form.Group elements for additional fields */}
        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          onClick={handleSubmit}>
          Save Changes
        </Button>
        <div>
          <Button className="mt-3" variant="primary" onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateUser;
