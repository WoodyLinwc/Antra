import React, { useState } from 'react';
import useLogging from '../hooks/useLogging';

function LoggingDemo({ initialCount = 0 }) {
    const [count, setCount] = useState(initialCount);

    // Use the logging hook
    useLogging('CounterComponent', { initialCount, count });

    return (
        <div style={{ padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h4>Logging Hook Demo</h4>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <p><small>Check the console to see the logs</small></p>
        </div>
    );
}

export default LoggingDemo;