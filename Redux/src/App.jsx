import React from "react";
import { StoreProvider, createStore } from "./redux/store";
import { Counter, CounterDisplay } from "./components/Counter";

function App() {
    return (
        <>
            <StoreProvider>
                <div>
                    <h1>Custom Redux Implementation</h1>
                    <Counter />
                    <CounterDisplay />
                </div>
            </StoreProvider>
        </>
    );
}

export default App;
