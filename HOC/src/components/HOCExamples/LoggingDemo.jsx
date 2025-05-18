import React, {useState} from 'react';
import withLogging from '../../hoc/withLogging';

function Counter({initialCount = 0}){
    const [count, setCount] = useState(initialCount);

    return (
        <div style={{ padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h4>Logging HOC Demo</h4>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <p><small>Check the console to see the logs</small></p>
        </div>
    );
}

// wrap with logging HOC
export default withLogging(Counter, 'CounterComponent');