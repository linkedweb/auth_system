// React component (Profile.js)
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile } from '../actions/auth'; // Replace with the correct action import

const Profile = ({ loadUserProfile, profile, email }) => {
    useEffect(() => {
        // Dispatch the action to load the user profile when the component mounts.
        loadUserProfile(email); // Dispatch the action with the user's email
    }, [loadUserProfile, email]);

    // State to manage editable fields
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    // Function to handle profile edits
    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile({ ...profile });
    };

    // Function to handle save changes
    const handleSave = () => {
        // Implement the logic to save edited profile data to the server
        setIsEditing(false);
        // Dispatch an action to update the profile in Redux state
    };

    return (
        <div className="card">
            {isEditing ? (
                <div>
                    {/* Input fields for editing */}
                    <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) =>
                            setEditedProfile({ ...editedProfile, name: e.target.value })
                        }
                    />
                    {/* Add more input fields for other editable profile data */}
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {/* Display user profile */}
                    {profile ? (
                        <>
                            <h1>{profile.name}'s Profile</h1>
                            <p>Email: {profile.email}</p>
                            <p>Designation: {profile.designation}</p>
                            <p>Organization: {profile.organization}</p>
                            <p>Location: {profile.location}</p>
                            {/* Add profile image and edit button */}
                            <button className="me-2" onClick={handleEdit}>
                                Edit
                            </button>
                        </>
                    ) : (
                        <p className="no-profile-message">No Profile Found :/</p>
                    )}
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: state.auth.profile,
    email: state.auth.email,
});

export default connect(mapStateToProps, { loadUserProfile })(Profile);
