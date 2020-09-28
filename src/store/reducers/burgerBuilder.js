import * as actionTypes from "../actions/actionTypes"


const initialState = {
    ingredients: {
        meat: 0,
        cheese: 0,
        beacon: 0,
        salad: 0,
    },
    totalPrice: 4
};

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    beacon: 0.7,
    salad: 0.5,
}


const burgerBuilder = (state = initialState, action) => {
    if (action.type === actionTypes.ADD_INGREDIENT) {
        const oldCount = state.totalPrice;
        const newPrice = oldCount + INGREDIENT_PRICE[action.ingredientName]
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
            },
            totalPrice: newPrice,
        }
    } else if (action.type === actionTypes.REMOVE_INGREDIENT) {
        const oldCount = state.totalPrice;
        const newPrice = oldCount - INGREDIENT_PRICE[action.ingredientName]
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
            },
            totalPrice: newPrice,
        }
    } else {
        return state
    }
};

export default burgerBuilder;