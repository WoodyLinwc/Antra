import { useState, useCallback, useMemo, memo } from 'react';

const shoppingItems = [
    {id:1, name: 'Apple', price: 1.2, isSelected: false},
    {id:2, name: 'Banana', price: 0.8, isSelected: false},
    {id:3, name: 'Cherry', price: 3.0, isSelected: false},
    {id:4, name: 'Date', price: 2.5, isSelected: false},
]

// A simple memoized child component
const ListItem = memo(function ListItem({item, onSelect}){
    console.log(`Rendering ListItem: ${item.name}`);

    return(
        <li 
            onClick={() => onSelect(item.id)}
            style={{color: item.isSelected ? 'red' : ''}}
        >
            {item.name}
        </li>
    );
});

// without React.memo, clicking the counter would cause all ListItem component to re-render

// function ListItem({item, onSelect}) {
//     console.log(`Rendering ListItem: ${item.name}`);
//     return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
// }

// parent component
function Shopping(){
    const [items, setItems] = useState(shoppingItems);

    const [filter, setFilter] = useState('');
    const [count, setCount] = useState(0);

    const handleSelect = useCallback((itemId) => {
        setItems(currentItems =>
            currentItems.map(item => 
                item.id === itemId ? {...item, isSelected: !item.isSelected} : item))
    }, []);

    // without useCallback, a new handleSelect function is created with new reference
    // useCallback ensures stable function references, React.memo determine when to skip re-render

    // const handleSelect = (itemId) => {
    //     setItems(currentItems =>
    //       currentItems.map(item => 
    //         item.id === itemId ? {...item, isSelected: !item.isSelected} : item))
    //   };


    // useMemo returns a memorized value, useEffect can only return a cleanup function
    // useMemo runs during rendering, useEffect runs after rendering, so might cause flickering UI
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        // returns a new array containing only the items whose names include the filter text
        return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    }, [items, filter])

    const totalPrice = useMemo(() => {
        console.log('Calculating total price...');
        return items
        .filter(item => item.isSelected)
        .reduce((sum, item) => sum + item.price, 0)
        .toFixed(2);
    }, [items])

    return(
        <div>
            <h3>Shopping List</h3>
            <div>
                {/* controlled? */}
                <input type="text" 
                placeholder='Filter items...' 
                value={filter} 
                onChange={e => setFilter(e.target.value)} />
            </div>

            <ul>
                {filteredItems.map(item => (
                    <ListItem
                        key={item.id}
                        item={item}
                        onSelect={handleSelect}
                    />
                ))}
            </ul>

            <div>
                <strong>Total: ${totalPrice}</strong>
            </div>

            <div>
                <button
                    onClick={() => setCount(prev => prev + 1)}
                >
                    Clicked: {count} times
                </button>
            </div>
        </div>
    )
}

export default Shopping;