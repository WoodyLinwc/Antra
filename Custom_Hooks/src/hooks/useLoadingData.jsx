// custom hook that handles loading state while data is being fetched
import {useState, useEffect} from 'react';

function useLoadingData(fetchFunction, dependencies = []){
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // flag to track if component is mounted
        let isMounted = true;

        // reset states when dependencies change
        setIsLoading(true)
        setError(null);

        // async function for data fetching
        const loadData = async () => {
            try {
                const result = await fetchFunction();

                if(isMounted){
                    setData(result);
                    setError(null);
                }
            } catch (error) {
                if(isMounted){
                    setError(error.message || 'Failed to load data');
                }
            } finally {
                // always set loading to false if component is still mounted
                if(isMounted){
                    setIsLoading(false);
                }
            }
        }

        loadData();

        // cleanup function that runs when component unmounted
        return () => {
            isMounted = false
        };
    }, dependencies)

    return {isLoading, data, error};
}

export default useLoadingData;