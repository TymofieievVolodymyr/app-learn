import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

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

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const  fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients =  () => {
    return async dispatch => {
        try {
            const response = await axios.get('/ingredients.json');
            dispatch(setIngredients(response.data));
        } catch (err) {
            dispatch(fetchIngredientsFailed());
            console.log(err);
        }
    }
}
