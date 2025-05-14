import { useState } from "react";

function Counter(){

    const [counter, setCounter] = useState(0);
    const [toggle, setToggle] = useState(false);


    function handleAdd(){
        setCounter((prev) => prev + 1);
    }

    const handleMinus = () => {
        setCounter((prev) => prev - 1);
    }

    const toggleBtn = () => {
        setToggle(!toggle);
    }


    return(
        <>
            <h3>Counter: {counter}</h3>
            <p>ternary operator</p>
            <button onClick={toggleBtn}>Toggle</button>
            {toggle ? 
                <>
                <button onClick={handleAdd}>Add one</button>
                <button onClick={handleMinus}>Minus one</button>
                </>
            : 
                <div></div>
            }
            
        </>
    )
}


export default Counter;