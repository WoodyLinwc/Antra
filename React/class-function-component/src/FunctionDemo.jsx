import React, { useState, useEffect, useRef } from "react";
import './style.css'

function FunctionDemo(props){
    const [counter, setCounter] = useState(0);
    const [timer, setTimer] = useState(0);

    // useRef is perfect for values we need to persist between renders
    // but that don't trigger re-renders when changed
    const intervalIdRef = useRef(null);

    const handleAdd = () => {
        setCounter(counter + 1);
    }

    const clearCount = () => {
        setCounter(0);
    }

    // componentDidMount + componentWillUnmount combined in one useEffect
    useEffect(() => {
        console.log("Component mounted (useEffect with empty deps array)");

        // this replace componentDidMount
        intervalIdRef.current = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        // this replace componentWillUnmount
        return () => {
            console.log("Component will unmount (useEffect cleanup)");

            clearInterval(intervalIdRef.current);

            console.log("Cleanup complete");
        }
    }, [])


    // componentDidUpdate for counter changes
    useEffect(() => {
        if(counter != 0){
            console.log(`Counter changed to ${counter}`);
        }
    }, [counter]) // run only when counter changes

    // componentDidUpdate for timer milestone
    useEffect(() => {
        if(timer !== 0 && timer % 5 === 0){
            console.log(`Timer reached ${timer} seconds!`);
        }
    }, [timer])

    console.log("Function component rendered")


    return (
        <div className="card">
            <h3>Function Component Demo</h3>
            <p>Counter: {counter}</p>
            <p>Timer: {timer} seconds</p>
            <button onClick={handleAdd}>Add</button>
            <button onClick={clearCount}>Reset</button>
            <br />
            {props.children}
        </div>
    )
}

export default FunctionDemo;