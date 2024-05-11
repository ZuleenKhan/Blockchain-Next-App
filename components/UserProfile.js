import React, { useState } from 'react';

// Sample user data
const user = {
  username: 'example_user',
  fullName: 'John Doe',
  email: 'john@example.com',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla felis libero, tincidunt at sapien vel, bibendum pharetra mauris.'
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save edited bio to backend or update user object
    console.log('Bio saved:', editedBio);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset edited bio to original bio
    setEditedBio(user.bio);
    setIsEditing(false);
  };

  const handleBioChange = (e) => {
    setEditedBio(e.target.value);
  };

  return (
    <div style={styles.userProfile}>
      <h2>User Profile</h2>
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Full Name:</strong> {user.fullName}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div style={styles.bioContainer}>
        <strong>Bio:</strong>
        {isEditing ? (
          <textarea
            style={styles.bioTextarea}
            value={editedBio}
            onChange={handleBioChange}
          />
        ) : (
          <p>{editedBio}</p>
        )}
        {isEditing ? (
          <div style={styles.editButtons}>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEditClick}>Edit Bio</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  userProfile: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  bioContainer: {
    marginTop: '20px',
  },
  bioTextarea: {
    width: '100%',
    minHeight: '100px',
    marginBottom: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  editButtons: {
    display: 'flex',
    marginTop: '10px',
  },
};

export default UserProfile;
