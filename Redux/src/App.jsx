import React from "react";
import { StoreProvider, createStore } from "./redux/store";
import { counterReducer } from "./redux/counterReducer";
import { Counter, CounterDisplay } from "./components/Counter";

const store = createStore(counterReducer, { count: 0 });

function App() {
    return (
        <>
            <StoreProvider store={store}>
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
