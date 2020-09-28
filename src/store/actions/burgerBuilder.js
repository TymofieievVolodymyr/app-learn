import * as actionTypes from "./actionTypes"

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}