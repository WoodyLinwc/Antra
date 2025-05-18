import React from 'react';
import withLoadingIndicator from '../../hoc/withLoadingIndicator';

// Mock API call that simulates network delay
const fetchUserData = () => {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            resolve({
            name: 'Woody Lin',
            email: 'lin@example.com',
            role: 'Developer',
            joinDate: '2025-01-22'
            });
        }, 2000); // 2 second delay
    });
};

function UserProfile({ data }) {
    return (
        <div style={{ padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4>Loading Indicator HOC Demo</h4>
            <p>This component showed a loading spinner for 2 seconds!</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div><strong>Name:</strong> {data.name}</div>
            <div><strong>Email:</strong> {data.email}</div>
            <div><strong>Role:</strong> {data.role}</div>
            <div><strong>Join Date:</strong> {data.joinDate}</div>
            </div>
        </div>
    );
}

export default  withLoadingIndicator(UserProfile, fetchUserData);