// In your React component
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile } from '../actions/auth';

const Profile = ({ loadUserProfile, profile }) => {
    useEffect(() => {
        loadUserProfile();
    }, [loadUserProfile]);

    return (
        <div>
            {profile ? (
                <div>
                    <h1>{profile.name}'s Profile</h1>
                    <p>Email: {profile.email}</p>
                    {/* Add other profile fields here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: state.auth.profile,
});

export default connect(mapStateToProps, { loadUserProfile })(Profile);
