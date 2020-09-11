import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../componentns/Burger/Burger"

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 1,
            cheese: 2,
            bacon: 1,
            salad: 2,
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