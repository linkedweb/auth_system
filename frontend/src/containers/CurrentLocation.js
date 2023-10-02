import React, { useState, useEffect } from 'react';

const CurrentLocation = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            }, (error) => {
                console.error('Error getting location:', error);
            });
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div>
            {latitude && longitude ? (
                <div>
                    <h2>Your Current Location:</h2>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
            ) : (
                <p>Fetching your location...</p>
            )}
        </div>
    );
};

export default CurrentLocation;
