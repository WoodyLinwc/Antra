import { useTheme } from "../../context/ThemeContext";
import ThemedButton from './ThemedButton';
import ThemedCard from './ThemedCard';

function ThemeApp(){
    // This gets { theme, toggleTheme, isDark }
    const {theme, toggleTheme, isDark} = useTheme();

    const containerStyle = {
        padding: '20px',
        backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
        // color: theme === 'light' ? '#212529' : '#f8f9fa',
        color: isDark ? '#f8f9fa' : '#212529',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        marginBottom: '20px'
    };

    return (
        <div style={containerStyle}>
            <h3>Theme Context Example</h3>
            <p>Current theme: {theme}</p>
            <button onClick={toggleTheme}>Toggle Theme</button>
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                <ThemedCard title="Card 1" content="This card uses the theme context"/>
                <ThemedCard title="Card 2" content="Changing the theme affects all components"/>
            </div>
            
            <div>
                <ThemedButton>Theme Button</ThemedButton>
            </div>
        </div>
    );
}

export default ThemeApp;