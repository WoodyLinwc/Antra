import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function LocalStorageDemo() {
    // Use the localStorage hook
    const { storedValue, updateStoredValue, clearStorage } = useLocalStorage('react-demo-note', '');

    return (
        <div style={{ padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h4>LocalStorage Hook Demo</h4>
        <p>This note persists in localStorage even after page refresh</p>
        
        <textarea 
            rows="3" 
            style={{ width: '100%', marginBottom: '10px' }}
            value={storedValue} 
            onChange={(e) => updateStoredValue(e.target.value)}
            placeholder="Type something here..."
        />
        
        <button onClick={clearStorage}>Clear Note</button>
        </div>
    );
}

export default LocalStorageDemo;