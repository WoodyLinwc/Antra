import { useState, useEffect, useRef } from "react";


function CountdownTimer(){
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    // persist between renders without causing re-render
    const timerRef = useRef(null);

    // format time as MM:SS
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        // if string length is less than 2, add '0' in front
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2,'0')}`;
    }


    // handle starting the timer
    const handleStart = () => {
        if(!isRunning){
            // convert time to total seconds
            const totalSeconds = (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);

            if(totalSeconds > 0){
                setTimeLeft(totalSeconds);
                setIsRunning(true);
            }
        }
    };

    // handle pausing/resuming the timer
    const handlePauseResume = () => {
        setIsRunning(!isRunning);
    };

    // handle resetting the timer
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft((parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0));
    };

    useEffect(() => {
        if(isRunning && timeLeft > 0){
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    // if there's 1 second left, stop the timer
                    if(prev <= 1){
                        clearInterval(timerRef.current);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000)
            //
        } else if (!isRunning && timerRef.current){
            // when you pause or stop the timer, you need to use clearInterval()
            clearInterval(timerRef.current);
        }

        // cleanup on unmount or when dependencies change
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, timeLeft])


    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 >Timer</h1>

            <div>
                <input type="number" min={0} value={minutes} onChange={(e) => setMinutes(e.target.value)} disabled={isRunning} style={{width: "120px"}}/>
                <span>Minutes</span>
                <input type="number" min={0} max={59} value={seconds} onChange={(e) => setSeconds(e.target.value)} disabled={isRunning} style={{width: "120px"}}/>
                <span>Seconds</span>

                <button onClick={handleStart}>START</button>
            </div>
            <div>
                <button onClick={handlePauseResume}>PAUSE/RESUME</button>
                <button onClick={handleReset}>RESET</button>
            </div>
            <div style={{padding: "10px", fontWeight: "bold"}}>
                {formatTime(timeLeft)}
            </div>
        </div>
    )
}

export default CountdownTimer;