import * as actionTypes from "../actions/actionTypes"

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const orderReducer = (state = initialState, action) => {
    if (action.type === actionTypes.PURCHASE_BURGER_START) {
        return {
            ...state,
            loading: true,
        }

    } else if (action.type === actionTypes.PURCHASE_INIT) {
        return {
            ...state,
            purchased: false,
        }
    } else if (action.type === actionTypes.PURCHASE_BURGER_SUCCESS) {
        const newOrder = {
            ...action.orderData,
            id: action.orderId,
        }
        return {
            ...state,
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder),
        }
    } else if (action.type === actionTypes.PURCHASE_BURGER_FAIL) {
        return {
            ...state,
            loading: false,
        }
    } else if (action.type === actionTypes.FETCH_ORDERS_START) {
        return {
            ...state,
            loading: true,
        }
    } else if (action.type === actionTypes.FETCH_ORDERS_SUCCESS) {
        return {
            ...state,
            loading: false,
            orders: action.orders,
        }
    } else if (action.type === actionTypes.FETCH_ORDERS_FAIL) {
        return {
            ...state,
            loading: false,
        }
    } else {
        return state
    }
};

export default orderReducer;