// HOC that provides localStorage persistence to a component
import React, {useState, useEffect} from 'react';

function withLocalStorage(WrappedComponent, storageKey, defaultValue=''){
    function WithLocalStorage(props){

        // initialize state from localStorage 
        // callback ensures it runs only once during initialization
        const [value, setValue] = useState(() => {
            const storedValue = localStorage.getItem(storageKey);
            return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
        });

        // update localStorage when state changes
        useEffect(() => {
            localStorage.setItem(storageKey, JSON.stringify(value));
        }, [value])

        // create interface for child component
        const localStorageProps = {
            storedValue: value,
            updatedStoredValue: setValue,
            clearStorage: () => {
                localStorage.removeItem(storageKey);
                setValue(defaultValue);
            }
        };

        return <WrappedComponent {...props} {...localStorageProps}/>
    }

    // Set display name for debugging
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithLocalStorage.displayName = `withLocalStorage(${displayName})`;

    return WithLocalStorage;
}

export default withLocalStorage;