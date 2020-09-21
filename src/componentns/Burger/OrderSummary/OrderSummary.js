import React, {Component} from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button"
//import {Link} from "react-router-dom";

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>:
                    {this.props.ingredients[igKey]}
                </li>
            });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.close} btnType='Danger'>CANCEL</Button>
                {/*<Link to='/checkout'>*/}
                    <Button clicked={this.props.continue} btnType='Success'>CONTINUE</Button>
                {/*</Link>*/}
            </Auxiliary>
        )
    }
}

export default OrderSummary;