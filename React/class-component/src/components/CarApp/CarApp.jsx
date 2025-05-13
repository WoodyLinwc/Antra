import React from "react";
import { v4 as uuidv4 } from "uuid";
import InfoCard from "./InfoCard";


const mockCarData = [
    {
        make: "Toyota",
        quantity: 10,
        id: uuidv4()
    },
    {
        make: "Honda",
        quantity: 10,
        id: uuidv4()
    },
    {
        make: "Nissan",
        quantity: 10,
        id: uuidv4()
    }
]


class CarApp extends React.Component{

    constructor(props){
        super(props);
        // built-in object that stores property values
        this.state = {
            cars: [...mockCarData]
        }
    };

    handleSell = (id) => {
        // update the state object
        this.setState((prev) => {
            const newCars = prev.cars.map((car) => {
                return car.id === id && car.quantity > 0 ? {...car, quantity: car.quantity - 1} : car
            });

            return {cars: newCars}
        })
    }

    render() {
        return(
            <>
                <h3>Car App</h3>
                <ul style={{display: "flex", gap: "10px", flexDirection: "row"}}>
                    {this.state.cars.map((car) => {
                        return <InfoCard key={car.id} car={car} handleSell={this.handleSell}/>
                    })}
                </ul>
            </>
        )
    }
}


export default CarApp;