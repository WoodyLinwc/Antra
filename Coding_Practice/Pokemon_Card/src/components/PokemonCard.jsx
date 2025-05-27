import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
    const { id, name, sprite, types, primaryType, stats, strengthLevel } =
        pokemon;

    // Type color mapping (keeping minimal for target types only)
    const typeColors = {
        grass: "#78c850",
        water: "#6890f0",
        fire: "#f08030",
    };

    // Strength-based hover colors
    const getHoverColor = (type, strength) => {
        const baseColor = typeColors[type];
        const opacity = 0.1 + strength * 0.1; // 0.1, 0.2, 0.3 opacity levels
        return `${baseColor}${Math.round(255 * opacity)
            .toString(16)
            .padStart(2, "0")}`;
    };

    const formatStatName = (statName) => {
        const statMap = {
            hp: "HP",
            attack: "ATK",
            defense: "DEF",
            "special-attack": "SP.ATK",
            "special-defense": "SP.DEF",
            speed: "SPD",
        };
        return statMap[statName] || statName.toUpperCase();
    };

    return (
        <div
            className="pokemon-card"
            style={{
                "--hover-color": getHoverColor(primaryType, strengthLevel),
                "--type-color": typeColors[primaryType],
            }}
        >
            <div className="card-header">
                <span className="pokemon-id">
                    #{id.toString().padStart(3, "0")}
                </span>
                <div className="strength-indicator">
                    {Array.from({ length: 3 }, (_, i) => (
                        <div
                            key={i}
                            className={`strength-dot ${
                                i <= strengthLevel ? "active" : ""
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="pokemon-image-container">
                <img
                    src={sprite}
                    alt={name}
                    className="pokemon-image"
                    loading="lazy"
                />
            </div>

            <h3 className="pokemon-name">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </h3>

            <div className="pokemon-types">
                {types.map((type) => (
                    <span
                        key={type}
                        className="type-badge"
                        style={{ backgroundColor: typeColors[type] }}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                ))}
            </div>
            {/* 
            <div className="pokemon-stats">
                {Object.entries(stats).map(([statName, value]) => (
                    <div key={statName} className="stat-row">
                        <span className="stat-name">
                            {formatStatName(statName)}
                        </span>
                        <div className="stat-bar-container">
                            <div
                                className="stat-bar"
                                style={{
                                    width: `${Math.min(
                                        (value / 255) * 100,
                                        100
                                    )}%`,
                                }}
                            />
                        </div>
                        <span className="stat-value">{value}</span>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default PokemonCard;
