import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button"

const OrderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>:
                {props.ingredients[igKey]}
            </li>
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.close} btnType='Danger'>CANCEL</Button>
            {/*<Link to='/checkout'>*/}
            <Button clicked={props.continue} btnType='Success'>CONTINUE</Button>
            {/*</Link>*/}
        </Auxiliary>
    )
}

export default OrderSummary;