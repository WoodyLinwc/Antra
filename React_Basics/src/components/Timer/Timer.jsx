import { useEffect,useState,useRef } from "react";


function Timer(){
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(null);
    const [isRunning, setIsRunning] = useState(true);

    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setTimer((prev) => prev + 1)
    //     }, 1000);

    //     return () => {
    //         clearInterval(id);
    //     }
    // },[])

    useEffect(() => {

        if(isRunning){
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 1000);
        }

        // runs when the component unmounts, clean up
        return () => {
            clearInterval(intervalRef.current)
            intervalRef.current = null;
        }

    },[isRunning])


    const stopTimer = () => {
        setIsRunning(false)
        // console.log("Stop the timer")
    }


    const resumeTimer = () => {
        setIsRunning(true)
        // console.log("Resume the timer")
    }

    const resetTimer = () => {
        setTimer(0)
    }


    return(
        <>
            <h3>Timer: {timer}</h3>
            <button onClick={stopTimer}>Stop Timer</button>
            <button onClick={resumeTimer}>Resume Timer</button>
            <button onClick={resetTimer}>Reset Timer</button>
        </>
    )

}




export default Timer;