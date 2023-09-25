import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container'>
        <div className='jumbotron mt-5'>
            <h1 className='display-4'>Automated Spectrum Management and Frequency Allocated System</h1>
            <p className='lead'>This is an incredible authentication system with production level features!</p>
            <hr className='my-4' />
            <p>Create Your Profile</p>
            <Link className='btn btn-primary btn-lg' to='/create-profile' role='button'>Create</Link>
        </div>
    </div>
);

export default Home;
