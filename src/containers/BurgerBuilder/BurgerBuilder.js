import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../componentns/Burger/Burger"

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            bacon: 0,
            salad: 0,
        }

    }

    render() {
        return (
            <Auxiliary>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Build Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;