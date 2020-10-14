import React, {useState, useEffect} from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../componentns/Burger/Burger";
import BuildControls from "../../componentns/Burger/BuildControls/BuildControls";
import Modal from "../../componentns/UI/Modal/Modal";
import OrderSummary from "../../componentns/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../componentns/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/actions/index"
import {connect} from "react-redux";

const BurgerBuilder = props => {

    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const showModal = () => {
        if (props.isAuth) {
            setModalVisibility(true);
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const closeHandler = () => {
        setModalVisibility(false);
    }

    const continuedHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    function updatePurchase(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
        return sum > 0
    }

    const disableInfo = {
        ...props.ing
    }

    for (const key in disableInfo) {
        disableInfo[key] = disableInfo[key] === 0
    }

    let orderSummary = null;

    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

    if (props.ing) {
        burger = (
            <Auxiliary>
                <Burger ingredients={props.ing}/>
                <BuildControls
                    addMore={props.onAddIngredient}
                    lessIng={props.onRemoveIngredient}
                    disable={disableInfo}
                    purchasable={updatePurchase(props.ing)}
                    price={props.price}
                    isAuth={props.isAuth}
                    showModal={showModal}/>
            </Auxiliary>
        );

        orderSummary = <OrderSummary
            price={props.price}
            close={closeHandler}
            continue={continuedHandler}
            ingredients={props.ing}/>
    }

    return (
        <Auxiliary>
            <Modal
                show={modalVisibility}
                close={closeHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
}

const mapStateToProps = state => {
    return {
        ing: state.bur.ingredients,
        price: state.bur.totalPrice,
        error: state.bur.error,
        purchased: state.ord.purchased,
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch(action.addIngredients(type)),
        onRemoveIngredient: (type) => dispatch(action.removeIngredients(type)),
        onInitIngredients: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));