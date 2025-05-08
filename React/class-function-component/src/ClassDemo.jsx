import React from "react";
import './style.css'

class ClassDemo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            counter: 0,
            timer: 0,
            intervalId: null
        }
    }


    // automatically bind this context
    handleAdd = () => {
        // this.setState({
        //     counter: this.state.counter + 1,
        // });

        this.setState((prev) => {
            return {counter: prev.counter + 1}
        })
    };



    clearCount = () => {
        this.setState({
            counter: 0,
        });
    };

    render(){
        console.log("Class component rendered");
        return (
            <div className="card">
            <h3>Class Component Demo</h3>
            <p>Counter: {this.state.counter}</p>
            <p>Timer: {this.state.timer} seconds</p>
            <button onClick={this.handleAdd}>Add</button>
            <button onClick={this.clearCount}>Reset</button>
            </div>
        )
    }

    // Runs once after initial render
    componentDidMount(){
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
        // console.log("Component mounted");
        // 1. Setting up timers/intervals
        // 2. API calls
        // 3. Adding event listeners
        const intervalId = setInterval(() => {
            this.setState(prevState => ({
                timer: prevState.timer + 1
            }));
        }, 1000);

        // Save interval ID to state so we can clear it later
        this.setState({ intervalId });
    }

    // Runs after every update to state or props
    componentDidUpdate(prevProps, prevState){
        // console.log("Component updated");
        // 1. Responding to state/prop changes
        // 2. Network requests based on prop changes
        // 3. DOM manipulations after update

        // Log when counter changes
        if (prevState.counter !== this.state.counter) {
            console.log(`Counter changed from ${prevState.counter} to ${this.state.counter}`);
        }

        // Do something when timer reaches certain value
        if (prevState.timer !== this.state.timer && this.state.timer % 5 === 0 && this.state.timer > 0) {
            console.log(`Timer reached ${this.state.timer} seconds!`);
        }

    }

    // Runs before component is removed from DOM
    componentWillUnmount(){
        console.log("Component will unmount");
        // 1. Cleanup (remove event listeners, timers, subscriptions)
        // 2. Cancel network requests
        // 3. Clear intervals

        clearInterval(this.state.intervalId);

        console.log("Cleanup complete");

    }
}

export default ClassDemo;



