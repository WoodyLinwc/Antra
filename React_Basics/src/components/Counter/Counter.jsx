import { useState } from "react";

function Counter(){

    const [counter, setCounter] = useState(0);


    function handleAdd(){
        setCounter((prev) => prev + 1);
    }

    const handleMinus = () => {
        setCounter((prev) => prev - 1);
    }


    return(
        <>
            <h3>Counter: {counter}</h3>
            <button onClick={handleAdd}>Add one</button>
            <button onClick={handleMinus}>Minus one</button>
        </>
    )
}


export default Counter;