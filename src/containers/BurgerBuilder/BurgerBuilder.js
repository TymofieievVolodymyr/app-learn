import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../componentns/Burger/Burger";
import BuildControls from "../../componentns/Burger/BuildControls/BuildControls";
import Modal from "../../componentns/UI/Modal/Modal";
import OrderSummary from "../../componentns/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../componentns/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions"
import {connect} from "react-redux";

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    beacon: 0.7,
    salad: 0.5,
}

class BurgerBuilder extends Component {
    state = {
        modalVisibility: false,
        loading: false,
        error: null,
    }

    // async componentDidMount() {
    //     try {
    //         const response = await axios.get('/ingredients.json');
    //         this.setState({
    //             ingredients: response.data
    //         });
    //     } catch (err) {
    //         this.setState({
    //             error: true,
    //         });
    //     }
    // }

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
        // const queryParams = [];
        // for (let i in this.props.ing) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]))
        //     // queryParams.push(i + '=' + this.props.ing[i])
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryString,
        // });

        this.props.history.push('/checkout');

    }

    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0
    }

    // addIngredient = (type) => {
    //     const oldCount = this.props.ing[type]
    //     const newCount = oldCount + 1;
    //
    //     const updatedIngredients = {
    //         ...this.props.ing
    //     }
    //     updatedIngredients[type] = newCount
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice + INGREDIENT_PRICE[type]
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     let oldCount = this.props.ing[type]
    //
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const newCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ing
    //     }
    //     updatedIngredients[type] = newCount
    //     const oldPrice = this.props.price;
    //     const newPrice = oldPrice - INGREDIENT_PRICE[type]
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    render() {
        const disableInfo = {
            ...this.props.ing
        }
        for (const key in disableInfo) {
            disableInfo[key] = disableInfo[key] === 0
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ing) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls
                        // ingredients={this.props.ing}
                        addMore={this.props.onAddIngredient}
                        lessIng={this.props.onRemoveIngredient}
                        disable={disableInfo}
                        purchasable={this.updatePurchase(this.props.ing)}
                        price={this.props.price}
                        showModal={this.showModal}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                close={this.closeHandler}
                continue={this.continuedHandler}
                ingredients={this.props.ing}/>
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

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: type}),
        onRemoveIngredient: (type) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: type}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));