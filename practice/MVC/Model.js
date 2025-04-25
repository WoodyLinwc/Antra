// Model.js
export const Model = (() => {
    class State {
        #data = [];
        #onChange = () => {};
        
        get data() {
        return this.#data;
        }
        
        set data(newData) {
        this.#data = newData;
        this.#onChange();
        }
        
        subscribe(callback) {
        this.#onChange = callback;
        }
        
        // Add other data manipulation methods
    }

    return { State };
})();