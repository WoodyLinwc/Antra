// custom hook that provides localStorage persistence
import {useState, useEffect} from 'react';


function useLocalStorage(storageKey, defaultValue=''){
    // initialize state from localStorage
    // callback ensures it runs only once during initialization
    const[value,setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(storageKey);
            return storedValue !== null ? JSON.parse(setValue) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    });

    // update localStorage when state changes
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    },[storageKey, value])

    // function to clear the storage
    const clearStorage = () => {
        try{
            localStorage.removeItem(storageKey);
            setValue(defaultValue);
        } catch (error){
            console.error('Error clearing localStorage:', error);
        }
    };


    return{
        storedValue: value,
        updatedStoredValue: setValue,
        clearStorage
    };
}

export default useLocalStorage;