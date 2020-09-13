import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../componentns/Burger/Burger"
import BuildControls from "../../componentns/Burger/BuildControls/BuildControls"

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    beacon: 0.7,
    salad: 0.5,

}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 2,
            cheese: 1,
            beacon: 0,
            salad: 1,
        },
        totalPrice: 4,
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICE[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type]

        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICE[type]
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] == 0
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredients={this.state.ingredients}
                    addMore={this.addIngredient}
                    lessIng={this.removeIngredientHandler}
                    disable={disableInfo}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;