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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const purchaseBurger = (order, token) => {
    return async dispatch => {
        dispatch(purchaseBurgerStart());
        try {
            const response = await axios.post('/orders.json?auth=' + token, order);
            dispatch(purchaseBurgerSuccess(response.data.name, order));
        } catch (err) {
            dispatch(purchaseBurgerFail(err));
        }
    }
}


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
}
export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err,
    }
}

export const fetchOrders = (token) => {
    return async dispatch => {
        dispatch(fetchOrdersStart())
        try {
            const response = await axios.get('/orders.json?auth=' + token)
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        } catch (err) {
            dispatch(fetchOrdersFail(err));
        }
    }
};
