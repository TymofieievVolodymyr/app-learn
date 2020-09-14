import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../componentns/Burger/Burger";
import BuildControls from "../../componentns/Burger/BuildControls/BuildControls";
import Modal from "../../componentns/UI/Modal/Modal";
import OrderSummary from "../../componentns/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    beacon: 0.7,
    salad: 0.5,

}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            beacon: 0,
            salad: 0,
        },
        totalPrice: 4,
        purchasable:false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
              return sum+el;
            },0)
        this.setState({purchasable:sum>0})
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] === 0
        }

        return (
            <Auxiliary>
                <Modal>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredients={this.state.ingredients}
                    addMore={this.addIngredient}
                    lessIng={this.removeIngredientHandler}
                    disable={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;