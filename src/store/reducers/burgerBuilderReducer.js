import * as actionTypes from "../actions/actionTypes"


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICE = {
    meat: 1.3,
    cheese: 0.4,
    beacon: 0.7,
    salad: 0.5,
}


const burgerBuilderReducer = (state = initialState, action) => {

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
        const newPrice = oldCount - INGREDIENT_PRICE[action.ingredientName];
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
            },
            totalPrice: newPrice,
        }
    } else if (action.type === actionTypes.SET_INGREDIENTS) {
        return {
            ...state,
            //order of burger ingredients;
            ingredients: {
                salad: action.ingredients.salad,
                beacon: action.ingredients.beacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            error: false,
            totalPrice: 4,
        }
    } else if (action.type === actionTypes.FETCH_INGREDIENTS_FAILED) {
        return {
            ...state,
            error: true,
        }
    }
    else {
        return state
    }
};

export default burgerBuilderReducer;