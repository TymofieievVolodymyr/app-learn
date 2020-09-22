import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../componentns/Burger/Burger";
import BuildControls from "../../componentns/Burger/BuildControls/BuildControls";
import Modal from "../../componentns/UI/Modal/Modal";
import OrderSummary from "../../componentns/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../componentns/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    beacon: 0.7,
    salad: 0.5,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5.7,
        purchasable: true,
        modalVisibility: false,
        loading: false,
        error: null,
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/ingredients.json');
            this.setState({
                ingredients: response.data
            });
        } catch (err) {
            this.setState({
                error: true,
            });
        }
    }

    showModal = () => {
        this.setState(
            {modalVisibility: true}
        );
    }

    closeHandler = () => {
        this.setState(
            {modalVisibility: false}
        );
    }

    continuedHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: queryString,
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        this.setState({purchasable: sum > 0})
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
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        // ingredients={this.state.ingredients}
                        addMore={this.addIngredient}
                        lessIng={this.removeIngredientHandler}
                        disable={disableInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        showModal={this.showModal}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                close={this.closeHandler}
                continue={this.continuedHandler}
                ingredients={this.state.ingredients}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.modalVisibility}
                    close={this.closeHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);