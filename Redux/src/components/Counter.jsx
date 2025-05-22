import React from "react";
import { useDispatch, useSelector } from "../redux/store";

// view
export function Counter() {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Simple Redux Counter</h2>
            <div>{count}</div>
            <div>
                {/* action, Plain JavaScript objects that describe what happened in your app. */}
                <button onClick={() => dispatch({ type: "INCREMENT" })}>
                    +
                </button>
                <button onClick={() => dispatch({ type: "DECREMENT" })}>
                    -
                </button>
                <button onClick={() => dispatch({ type: "RESET" })}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export function CounterDisplay() {
    const count = useSelector((state) => state.count);

    return (
        <div>
            <p>
                Count from another component: <strong>{count}</strong>
            </p>
        </div>
    );
}
