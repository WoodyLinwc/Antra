const URL = "https://pokeapi.co/api/v2/pokemon/ditto";

async function fetchData(url){
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`API request failed with status ${response.status}`);
        }

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

fetchData(URL).then(result => console.log(result))

// Promise.all 
const firstPokemon = ["bulbasaur","charmander","squirtle"];
const requests = firstPokemon.map(name => 
    fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`));

Promise.all(requests)
    .then(result => console.log(result))
    .catch(error => console.error(error));


// Promise.allSettled
const somePokemon = ["pikachu","pichuka","pipichu"];
const requests2 = somePokemon.map(name =>
    fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`));


Promise.allSettled(requests2)
    .then(results => {
        const successful = results.filter(result => result.status === "fulfilled");
        // const failed = results.filter(result => result.status === "rejected");

        console.log("Successful requests: ", successful.map(s => s.value));
    });



// Promise.race
const slowServer = "https://slow-pokeapi.example.com/api/v2/pokemon/mudkip";
const fastServer = "https://pokeapi.co/api/v2/pokemon/mudkip";

Promise.race([
    fetchData(slowServer),
    fetchData(fastServer)
])
.then(result => console.log("First to complete: ", result))
.catch(error => console.error("Both requests failed:", error));



// Promise.any
const someServers = ["https://pokeapi.co/api/v2/pokemon/totodile", "https://fake-pokeapi.co/api/v2/pokemon/totodile", "https://pokeapi.co/api/v2/pokemon/pokemonking"];

Promise.any(someServers.map(url => fetchData(url)))
    .then(result => console.log("First Successful result: ", result))