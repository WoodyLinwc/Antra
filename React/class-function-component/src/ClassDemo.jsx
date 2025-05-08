import React from "react";
import './style.css'

class ClassDemo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            counter: 0,
            timer: 0
        }
    }


    // automatically bind this context
    handleAdd = () => {
        this.setState({
            counter: this.state.counter + 1,
        });
    };

    clearCount = () => {
        this.setState({
            counter: 0,
        });
    };

    render(){
        return (
            <div className="card">
            <h3>Class Component Demo</h3>
            <p>Counter: {this.state.counter}</p>
            <button onClick={this.handleAdd}>Add</button>
            <button onClick={this.clearCount}>Reset</button>
            </div>
        )
    }

    componentDidMount(){

    }

    componentDidUpdate(){
        
    }
}

export default ClassDemo;



