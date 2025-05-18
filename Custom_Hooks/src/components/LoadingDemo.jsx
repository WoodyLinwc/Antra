import React from 'react';
import useLoadingData from '../hooks/useLoadingData';

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

function LoadingDemo() {
    // Use the loading data hook
    const { isLoading, data, error } = useLoadingData(fetchUserData, []);

    // Simple loading indicator
    const LoadingSpinner = () => (
        <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
        }}>
        <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }} />
        <style>{`
            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        `}</style>
        </div>
    );

    // Error indicator
    const ErrorMessage = ({ message }) => (
        <div style={{ 
        color: 'red', 
        padding: '10px', 
        border: '1px solid red',
        borderRadius: '4px',
        margin: '10px 0'
        }}>
        Error: {message}
        </div>
    );

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div style={{ padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h4>Loading Data Hook Demo</h4>
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

export default LoadingDemo;