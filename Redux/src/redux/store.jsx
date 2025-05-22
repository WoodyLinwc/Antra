import { createContext, useContext, useSyncExternalStore } from "react";

// create a simple store, the centralized location that holds your application's state.
export function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = new Set();

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return { getState, dispatch, subscribe };
}

// create context for the store
const StoreContext = createContext(null);

export function StoreProvider({ store, children }) {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}

// custom useDispatch hook
export function useDispatch() {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useDispatch must be used within a StoreProvider");
    }
    return store.dispatch;
}

// custom useSelector hook
export function useSelector(selector) {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("useSelector must be used within a StoreProvider");
    }

    return useSyncExternalStore(
        store.subscribe,
        () => selector(store.getState()),
        () => selector(store.getState())
    );
}
