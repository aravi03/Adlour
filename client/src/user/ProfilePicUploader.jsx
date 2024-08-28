import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from "../utils/UserContext"
import './ProfilePicUploader.css'; // Import the CSS file

const ProfilePicUploader = ({ currentProfilePic, onProfilePicChange }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userContext, setUserContext] = useContext(UserContext)
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('File size should not exceed 2MB.');
        return;
      }

      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setError('Only PNG, JPG, and JPEG formats are allowed.');
        return;
      }

      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const url = apiUrl + '/api/user/updatepic/' + userContext.user._id;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profilePic: selectedFile }),
      })
        .then(response => response.json())
        .then(data => {
          onProfilePicChange(data.profilePic);
          setShowModal(false);
        })
        .catch(err => {
          console.error('Error uploading profile picture:', err);
        });
    }
  };

  return (
    <div className="profile-pic-container">
      <img
        src={currentProfilePic || '/profilePic.jpg'}
        alt="Profile"
        className="profile-pic"
        onClick={handleShowModal}
      />
      <div className="edit-overlay" onClick={handleShowModal}>
        Edit Picture
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile">
              <Form.Label>Choose an image (PNG, JPG, JPEG up to 2MB)</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
              />
              {error && <p className="text-danger">{error}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePicUploader;
