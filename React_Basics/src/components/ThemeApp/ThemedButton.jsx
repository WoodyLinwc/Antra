import { useTheme } from '../../context/ThemeContext';

function ThemedButton({ children }) {
const { theme } = useTheme();

const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: theme === 'light' ? '#0d6efd' : '#6c757d',
    color: 'white',
    transition: 'all 0.3s ease'
};

return (
    <button style={buttonStyle}>
    {children}
    </button>
);
}

export default ThemedButton;