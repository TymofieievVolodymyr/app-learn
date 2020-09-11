import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(keyIng => {
            return [...Array(props.ingredients[keyIng])].map((_, i) => {
                    return <BurgerIngredient key={keyIng+i} type={keyIng}/>
                })
        })

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;