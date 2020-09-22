import React from "react";

import classes from './Orders.module.css';
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const order = props => {

    // const ingredients = Object.keys(props.ingredients)
    //     .map(keyIng => {
    //         return [...Array(props.ingredients[keyIng])].map((_, i) => {
    //             return <li key={keyIng + i} type={keyIng}>{keyIng} {i} </li>
    //         })
    //     })
    //     .reduce((arr, el) => {
    //         return arr.concat(el)
    //     }, [])

    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    
    return (
        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price<strong> {props.price}</strong></p>
        </div>
    );
}

export default order;