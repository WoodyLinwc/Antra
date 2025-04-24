const url = "https://pokeapi.co/api/v2/pokemon/ditto"

async function fetchData(url){
    try {
        const response = await fetch(url);
        const data = await response.json();

        const name = data.name;
        const id = data.id;

        return {
            name,
            id
        }


    } catch (error) {
        throw error;
    }
}


fetchData(url).then(result => console.log(result))

