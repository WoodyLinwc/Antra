import React from "react";

// React.PureComponent: shallow comparison
class InfoCard extends React.Component{

    shouldComponentUpdate(nextProps,nextState){
        const {make, quantity} = this.props.car;

        return (
            make !== nextProps.car.make || quantity !== nextProps.car.quantity
        );
    }

    render() {
        // const { car } = this.props;
        // const { make, quantity, id } = car;
        const {make, quantity, id} = this.props.car;
        console.log(`${make} rendered`);

        return(
            <div style={{width: "100px", height: "100px", border: "1px black solid"}}>
                <div>{make}</div>
                <div>{quantity}</div>
                {/* <div>{this.props.car.id}</div> */}
                <button onClick={() => this.props.handleSell(id)}>Sell</button>
            </div>
        )

    }
}

export default InfoCard;