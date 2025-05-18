// HOC that shows a loading indicator while data is being fetched
import React, {useState, useEffect} from 'react';

function withLoadingIndicator(WrappedComponent, fetchData){
    function WithLoadingIndicator(props){
        const [isLoading, setIsLoading] = useState(true);
        const [data, setData] = useState(null);
        const [error, setError] = useState(null);

        useEffect(() => {
            // flag to track if component is mounted
            let isMounted = true;

            // async function for data fetching
            const loadData = async () => {
                try {
                    setIsLoading(true);
                    const result = await fetchData(props);

                    if(isMounted){
                        setData(result);
                        setError(null);
                    }
                } catch (err){
                    if(isMounted){
                        setError(err.message || 'Failed to load data');
                    }
                } finally {
                    // always set loading to false if component is still mounted
                    if(isMounted){
                        setIsLoading(false)
                    }
                }
            };

            loadData();

            // cleanup function that runs when component unmounts
            return() => {
                isMounted = false;
            };
        }, []);


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

        return <WrappedComponent {...props} data={data} isLoading={isLoading} error={error} />;
    }

    // Set display name for debugging
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithLoadingIndicator.displayName = `withLoadingIndicator(${displayName})`;

    return WithLoadingIndicator;
}

export default withLoadingIndicator;