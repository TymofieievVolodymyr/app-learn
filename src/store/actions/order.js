import * as actionTypes from "../actions/actionTypes"
import axios from "../../axios-orders"

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (order) => {
    return async dispatch => {
        dispatch( purchaseBurgerStart());
        try {
            const response = await axios.post('/orders.json', order);
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data, order));
        } catch (err) {
            dispatch(purchaseBurgerFail(err));
        }
    }
}