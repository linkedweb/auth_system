import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createprofile } from '../actions/auth';
import axios from 'axios';

const CreateProfile = ({ createprofile }) => {
    const [profileCreated, setProfileCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        designation: '',
        organization :'',
        radiodetails : '',
        radiosetdetails : '',
    });

    const { name, email, contact, designation, organization,radiodetails, radiosetdetails} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createprofile(name, email, contact, designation, organization,radiodetails, radiosetdetails);
        setProfileCreated(true);
    };

    if (profileCreated) {
        return <Redirect to='/profile' />
    }

    return (
        <div className='container mt-5'>
            <h1>Create Profile</h1>
            <p>Create your user profile</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Name*'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Contact*'
                        name='contact'
                        value={contact}
                        onChange={e => onChange(e)}
                        maxLength='10'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Designation*'
                        name='designation'
                        value={designation}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Organization*'
                        name='organization'
                        value={organization}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Radio Details*'
                        name='radiodetails'
                        value={radiodetails}
                        onChange={e => onChange(e)}
                        required
                    />
                </div><div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Radio Set Details*'
                        name='radiosetdetails'
                        value={radiosetdetails}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Create Profile</button>
            </form>
        </div>
    );
};

// const mapStateToProps = state => ({
//     isSignin: state.auth.isSignin
// });

export default (CreateProfile);
