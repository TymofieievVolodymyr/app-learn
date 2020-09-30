import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../utility"

// const initialState = {
//     ingredients: null,
//     totalPrice: 4,
//     error: false,
// };
// const INGREDIENT_PRICES = {
//     meat: 1.3,
//     cheese: 0.4,
//     beacon: 0.7,
//     salad: 0.5,
// }
//
//
// const burgerBuilderReducer = (state = initialState, action) => {
//
//     if (action.type === actionTypes.ADD_INGREDIENT) {
//         const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
//         const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
//         return {
//             ...state,
//             // ingredients: {
//             //     ...state.ingredients,
//             //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
//             // },
//              ingredients: updatedIngredients,
//              totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
//         }
//     } else if (action.type === actionTypes.REMOVE_INGREDIENT) {
//         const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
//         const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
//         return {
//             ingredients: updatedIngredients,
//             totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
//         }
//     } else if (action.type === actionTypes.SET_INGREDIENTS) {
//         return {
//             ...state,
//             //order of burger ingredients;
//             ingredients: {
//                 salad: action.ingredients.salad,
//                 beacon: action.ingredients.beacon,
//                 cheese: action.ingredients.cheese,
//                 meat: action.ingredients.meat
//             },
//             error: false,
//             totalPrice: 4,
//         }
//         return updateObject( state, {
//             ingredients: {
//                 salad: action.ingredients.salad,
//                 bacon: action.ingredients.bacon,
//                 cheese: action.ingredients.cheese,
//                 meat: action.ingredients.meat
//             },
//             totalPrice: 4,
//             error: false
//         });
//     } else if (action.type === actionTypes.FETCH_INGREDIENTS_FAILED) {
//         // return {
//         //     ...state,
//         //     error: true,
//         // }
//         return updateObject(state, {error:true})
//     }
//     else {
//         return state
//     }
// };
//
// export default burgerBuilderReducer;



const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    beacon: 0.7
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject( state, updatedState );
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject( state, updatedSt );
};

const setIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            beacon: action.ingredients.beacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    } );
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;