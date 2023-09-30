// In your React component
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile } from '../actions/auth';

const Profile = ({ loadUserProfile, profile, email}) => {
    useEffect(() => {
        loadUserProfile(email);
    }, [loadUserProfile,email]);
    console.log('inside profile.js');
    console.log('printing profile name');
    console.log(profile);

  //  console.log(profile.name);
    return (
        <div>
            {profile ? (
                <div>
                  <p>profile is not empty</p>
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
    email: state.auth.email,
});

export default connect(mapStateToProps, { loadUserProfile })(Profile);
