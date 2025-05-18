import React from 'react';
import LoggingDemo from './LoggingDemo';
import LocalStorageDemo from './LocalStorageDemo';
import LoadingDemo from './LoadingDemo';

function HOCDemo() {
return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
    <h3>Higher-Order Component Examples</h3>
    
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
        <h4>HOC Patterns Demonstrated</h4>
        <ol>
        <li><strong>withLogging</strong> - Logs component lifecycle events to console</li>
        <li><strong>withLocalStorage</strong> - Persists component state to browser localStorage</li>
        <li><strong>withLoadingIndicator</strong> - Shows loading UI while data is fetched</li>
        </ol>
        {/* <p>These patterns demonstrate how HOCs can:</p>
        <ul>
        <li>Add cross-cutting functionality to components</li>
        <li>Handle side effects (logging, storage)</li>
        <li>Manage UI state (loading indicators)</li>
        <li>Provide data to components</li>
        </ul> */}
    </div>
    </div>
);
}

export default HOCDemo;