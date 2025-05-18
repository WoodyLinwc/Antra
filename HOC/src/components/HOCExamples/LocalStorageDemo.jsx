import React from 'react';
import withLocalStorage from '../../hoc/withLocalStorage';

// Component that uses localStorage to persist note text
function NotePad({ storedValue, updateStoredValue, clearStorage }) {
    return (
        <div style={{ padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4>LocalStorage HOC Demo</h4>
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

// wrap with localStorage HOC
export default withLocalStorage(NotePad, 'react-demo-note', '')