import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../utility"

// const initialState = {
//     orders: [],
//     loading: false,
//     purchased: false,
// };
//
// const orderReducer = (state = initialState, action) => {
//     if (action.type === actionTypes.PURCHASE_BURGER_START) {
//         return {
//             ...state,
//             loading: true,
//         }
//
//     } else if (action.type === actionTypes.PURCHASE_INIT) {
//         return {
//             ...state,
//             purchased: false,
//         }
//     } else if (action.type === actionTypes.PURCHASE_BURGER_SUCCESS) {
//         const newOrder = {
//             ...action.orderData,
//             id: action.orderId,
//         }
//         console.log(newOrder);
//
//         return {
//             ...state,
//             loading: false,
//             purchased: true,
//             orders: state.orders.concat(newOrder),
//         }
//     } else if (action.type === actionTypes.PURCHASE_BURGER_FAIL) {
//         return {
//             ...state,
//             loading: false,
//         }
//     } else if (action.type === actionTypes.FETCH_ORDERS_START) {
//         return {
//             ...state,
//             loading: true,
//         }
//     } else if (action.type === actionTypes.FETCH_ORDERS_SUCCESS) {
//         console.log(action.orders)
//         return {
//             ...state,
//             loading: false,
//             orders: action.orders,
//         }
//     } else if (action.type === actionTypes.FETCH_ORDERS_FAIL) {
//         return {
//             ...state,
//             loading: false,
//         }
//     } else {
//         return state
//     }
// };
//
// export default orderReducer;



const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const orderReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart( state, action );
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess( state, action )
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail( state, action );
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
        default: return state;
    }
};

export default orderReducer;