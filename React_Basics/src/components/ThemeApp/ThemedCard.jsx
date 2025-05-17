import { useTheme } from '../../context/ThemeContext';

function ThemedCard({ title, content }) {
const { theme } = useTheme();

const cardStyle = {
    padding: '16px',
    borderRadius: '4px',
    margin: '8px 0',
    backgroundColor: theme === 'light' ? 'white' : '#495057',
    color: theme === 'light' ? '#212529' : 'white',
    boxShadow: theme === 'light' 
    ? '0 2px 4px rgba(0,0,0,0.1)' 
    : '0 2px 4px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    width: '200px'
};

const titleStyle = {
    marginTop: 0,
    fontWeight: 'bold'
};

return (
    <div style={cardStyle}>
    <h4 style={titleStyle}>{title}</h4>
    <p>{content}</p>
    </div>
);
}

export default ThemedCard;