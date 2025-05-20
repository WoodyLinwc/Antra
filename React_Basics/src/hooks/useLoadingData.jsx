import {useState, useEffect} from 'react';

// custom hook for loading data from an API
export function useLoadingData(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch data function
    const fetchData = async (fetchUrl) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(fetchUrl);
            const result = await response.json();

            setData(result);

        } catch (error) {
            setError(err.message || 'An error occurred while fetching data')
        } finally {
            setLoading(false);
        }
    };


    // initial data load when component mounts or URL changes
    useEffect(() => {
        if(url){
            fetchData(url);
        }
    }, [url]);


    return {data, loading, error, refetch: fetchData}
}

export function usePokemon(pokemonName = 'ditto'){
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const {data, loading, error, refetch} = useLoadingData(apiUrl);

    // function to fetch a random Pokemon
    const fetchRandomPokemon = async () => {
        const randomId = Math.floor(Math.random() * 1024) + 1;
        refetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    }

    return{
        pokemon: data,
        loading,
        error,
        fetchRandomPokemon
    };
}