import { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";
import "./App.css";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch Pokedex and filter Pokemon by type
    const fetchPokedexData = async () => {
        try {
            setLoading(true);

            // First, fetch the National Pokedex (id: 1)
            const pokedexResponse = await fetch(
                "https://pokeapi.co/api/v2/pokedex/1"
            );
            const pokedexData = await pokedexResponse.json();

            // Get the first 151 Pokemon entries (original 151)
            const pokemonEntries = pokedexData.pokemon_entries.slice(0, 151);

            // Fetch individual Pokemon data and filter by type
            const pokemonPromises = pokemonEntries.map(async (entry) => {
                const pokemonResponse = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`
                );
                const pokemonData = await pokemonResponse.json();

                // Check if Pokemon has grass, water, or fire type
                const hasTargetType = pokemonData.types.some((typeInfo) =>
                    ["grass", "water", "fire"].includes(typeInfo.type.name)
                );

                if (hasTargetType) {
                    // Get the primary type (first type)
                    const primaryType = pokemonData.types[0].type.name;

                    return {
                        id: pokemonData.id,
                        name: pokemonData.name,
                        sprite: pokemonData.sprites.front_default,
                        types: pokemonData.types.map((t) => t.type.name),
                        primaryType: primaryType,
                        stats: pokemonData.stats.reduce((acc, stat) => {
                            acc[stat.stat.name] = stat.base_stat;
                            return acc;
                        }, {}),
                        // Calculate relative strength within type for hover effect
                        totalStats: pokemonData.stats.reduce(
                            (sum, stat) => sum + stat.base_stat,
                            0
                        ),
                    };
                }
                return null;
            });

            const allPokemon = await Promise.all(pokemonPromises);
            const filteredPokemon = allPokemon.filter((p) => p !== null);

            // Sort by type and then by total stats for strength calculation
            const sortedByType = {
                grass: filteredPokemon
                    .filter((p) => p.primaryType === "grass")
                    .sort((a, b) => a.totalStats - b.totalStats),
                water: filteredPokemon
                    .filter((p) => p.primaryType === "water")
                    .sort((a, b) => a.totalStats - b.totalStats),
                fire: filteredPokemon
                    .filter((p) => p.primaryType === "fire")
                    .sort((a, b) => a.totalStats - b.totalStats),
            };

            // Assign strength levels (0 = weakest, 1 = medium, 2 = strongest within type)
            Object.keys(sortedByType).forEach((type) => {
                sortedByType[type].forEach((pokemon, index) => {
                    const typeCount = sortedByType[type].length;
                    if (typeCount <= 3) {
                        pokemon.strengthLevel = index;
                    } else {
                        // Divide into thirds
                        const third = Math.floor(typeCount / 3);
                        if (index < third) pokemon.strengthLevel = 0;
                        else if (index < third * 2) pokemon.strengthLevel = 1;
                        else pokemon.strengthLevel = 2;
                    }
                });
            });

            // Combine all Pokemon back together
            const finalPokemon = [
                ...sortedByType.grass,
                ...sortedByType.water,
                ...sortedByType.fire,
            ].sort((a, b) => a.id - b.id); // Sort by Pokedex number

            setPokemon(finalPokemon);
        } catch (err) {
            setError(`Failed to fetch Pokemon data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokedexData();
    }, []);

    if (loading) {
        return (
            <div className="app">
                <h1>Pokédex</h1>
                <div className="loading">
                    <div className="pokeball-spinner"></div>
                    <p>Loading Pokémon...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <h1>Pokédex</h1>
                <div className="error">
                    <p>{error}</p>
                    <button onClick={fetchPokedexData}>Try Again</button>
                </div>
            </div>
        );
    }

    // Group Pokemon by type for display
    const pokemonByType = {
        grass: pokemon.filter((p) => p.primaryType === "grass"),
        water: pokemon.filter((p) => p.primaryType === "water"),
        fire: pokemon.filter((p) => p.primaryType === "fire"),
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Pokédex</h1>
                <p>Grass, Water & Fire Type Pokémon</p>
            </header>

            <main className="pokemon-container">
                {Object.entries(pokemonByType).map(
                    ([type, typesPokemon]) =>
                        typesPokemon.length > 0 && (
                            <section key={type} className="type-section">
                                <h2 className={`type-header ${type}`}>
                                    {type.charAt(0).toUpperCase() +
                                        type.slice(1)}{" "}
                                    Type
                                </h2>
                                <div className="pokemon-grid">
                                    {typesPokemon.map((p) => (
                                        <PokemonCard key={p.id} pokemon={p} />
                                    ))}
                                </div>
                            </section>
                        )
                )}
            </main>
        </div>
    );
}

export default App;
