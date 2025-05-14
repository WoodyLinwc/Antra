import { useState } from "react";

function Counter(){

    const [counter, useCounter] = useState(0);


    function handleAdd(){
        useCounter((prev) => prev + 1);
    }

    const handleMinus = () => {
        useCounter((prev) => prev - 1);
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