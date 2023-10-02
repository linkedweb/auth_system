// In your React component
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUserProfile } from '../actions/auth';
import './Profile.css'
import CurrentLocation from './CurrentLocation';
// import image




const Profile = ({ loadUserProfile, profile, email }) => {
useEffect(() => {
loadUserProfile(email);
}, [loadUserProfile, email]);
console.log('inside profile.js');
console.log('printing profile name');
console.log(profile);


// console.log(profile.name);
return (
<div className="card">
{profile ? (
<div className='container'>
<div className='container-profile'>
<div className="row">
<div className="profile-img">
{/* <div className="col-md-4">
<img src={profile.picture} alt="Profile"/>
</div> */}
</div>
<div className="col-md-6">
<div className="profile-head">
<h2>{profile.name}</h2>
</div>
</div>
</div>
<div className="col-md-8 pl-5">
<div className="tab-pane fade show active">
<div className="row">
<div className="col-md-6">
<label>Email</label>
</div>
<div className="col-md-6 text-style">
<p>{profile.email}</p>
</div>
</div>


<div className="row">
<div className="col-md-6">
<label>Contact Number</label>
</div>
<div className="col-md-6 text-style">
<p>{profile.contact}</p>
</div>
</div>


<div className="row">
<div className="col-md-6">
<label>Organization</label>
</div>
<div className="col-md-6 text-style">
<p>{profile.organization}</p>
</div>
</div>


<div className="row">
<div className="col-md-6">
<label>Designation</label>
</div>
<div className="col-md-6 text-style">
<p>{profile.designation}</p>
</div>
</div>


<div className="row">
<div className="col-md-6 ">
<label>Radiodetails</label>
</div>
<div className="col-md-6 text-style">
<p>{profile.radiodetails}</p>
</div>
</div>


<div className="row">
<div className="col-md-6">
<label>Radio Set Details</label>
</div>
<div className="col-md-6 text-style">
<p>{profile.radiosetdetails}</p>
</div>
</div>


<div className="row">
<div className="col-md-6">
<label>Location</label>
</div>
<div className="col-md-6 text-style">
<CurrentLocation/>
</div>
</div>


</div>
</div>
</div>
<div className="col-md-2">
<button onClick={Profile} className="edit-profile-button">
Edit Profile
</button>
</div>
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
