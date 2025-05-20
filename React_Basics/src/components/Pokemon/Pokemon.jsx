import { usePokemon } from '../../hooks/useLoadingData';

function Pokemon() {
    const { pokemon, loading, error, fetchRandomPokemon } = usePokemon();

    // Simple styling
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px',
        margin: '15px auto',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '90%'
    };

    const buttonStyle = {
        backgroundColor: '#e53935',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    };

    const imageContainerStyle = {
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: '12px',
        marginBottom: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        maxWidth: '360px',
        margin: '15px 0',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
        fontSize: '14px'
    };

    const thStyle = {
        backgroundColor: '#4fc3f7',
        color: 'white',
        padding: '8px 12px',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '14px'
    };

    const tdStyle = {
        padding: '6px 12px',
        borderBottom: '1px solid #ddd',
        fontSize: '13px'
    };

    const typeTagStyle = {
        backgroundColor: '#4fc3f7',
        color: 'white',
        padding: '3px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        display: 'inline-block',
        margin: '2px'
    };

    if (loading) {
        return (
        <div style={containerStyle}>
            <h3>Pokemon Data</h3>
            <p>Loading...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div style={containerStyle}>
            <h3>Pokemon Data</h3>
            <p>Error: {error}</p>
            <button style={buttonStyle} onClick={fetchRandomPokemon}>
            Try Another Pokemon
            </button>
        </div>
        );
    }

    return (
        <div style={containerStyle}>
        <h3>Pokemon Data</h3>
        
        {pokemon && (
            <>
            <div style={imageContainerStyle}>
                <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                style={{ width: '120px', height: '120px' }}
                />
            </div>
            
            <h2 style={{ textTransform: 'capitalize', margin: '8px 0', fontSize: '1.5rem' }}>{pokemon.name}</h2>
            
            <table style={tableStyle}>
                <tbody>
                <tr>
                    <th style={thStyle}>Property</th>
                    <th style={thStyle}>Value</th>
                </tr>
                <tr>
                    <td style={tdStyle}>ID</td>
                    <td style={tdStyle}>{pokemon.id}</td>
                </tr>
                <tr>
                    <td style={tdStyle}>Height</td>
                    <td style={tdStyle}>{pokemon.height / 10} m</td>
                </tr>
                <tr>
                    <td style={tdStyle}>Weight</td>
                    <td style={tdStyle}>{pokemon.weight / 10} kg</td>
                </tr>
                {/* <tr>
                    <td style={tdStyle}>Base Experience</td>
                    <td style={tdStyle}>{pokemon.base_experience}</td>
                </tr> */}
                <tr>
                    <td style={tdStyle}>Types</td>
                    <td style={tdStyle}>
                    {pokemon.types.map(typeInfo => (
                        <span key={typeInfo.type.name} style={typeTagStyle}>
                        {typeInfo.type.name}
                        </span>
                    ))}
                    </td>
                </tr>
                <tr>
                    <td style={tdStyle}>Abilities</td>
                    <td style={tdStyle}>
                    {pokemon.abilities.map(abilityInfo => (
                        <div key={abilityInfo.ability.name}>
                        {abilityInfo.ability.name.replace('-', ' ')}
                        {abilityInfo.is_hidden && ' (hidden)'}
                        </div>
                    ))}
                    </td>
                </tr>
                {/* <tr>
                    <td style={tdStyle}>Base Stats</td>
                    <td style={tdStyle}>
                    {pokemon.stats.map(statInfo => (
                        <div key={statInfo.stat.name}>
                        {statInfo.stat.name.replace('-', ' ')}: {statInfo.base_stat}
                        </div>
                    ))}
                    </td>
                </tr> */}
                </tbody>
            </table>
            </>
        )}
        
        <button style={buttonStyle} onClick={fetchRandomPokemon}>
            Random Pokemon
        </button>
        </div>
    );
}

export default Pokemon;