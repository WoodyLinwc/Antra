import React from 'react';
import LoggingDemo from './LoggingDemo';
import LocalStorageDemo from './LocalStorageDemo';
import LoadingDemo from './LoadingDemo';

function HOCToHooksDemo() {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3>React Hooks Implementation</h3>
        
        <LoggingDemo initialCount={5} />
        <LocalStorageDemo />
        <LoadingDemo />
        
        <div style={{ 
            padding: '10px', 
            margin: '10px 0', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#f8f9fa'
        }}>
            <h4>Custom Hooks Demonstrated</h4>
            <ol>
            <li><strong>useLogging</strong> - Logs component lifecycle events to console</li>
            <li><strong>useLocalStorage</strong> - Persists component state to browser localStorage</li>
            <li><strong>useLoadingData</strong> - Manages loading state while data is fetched</li>
            </ol>
        </div>
        </div>
    );
}

export default HOCToHooksDemo;