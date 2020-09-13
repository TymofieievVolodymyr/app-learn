import React from "react";

import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl"
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Beacon', type: 'beacon'},
    {label: 'Salad', type: 'salad'},
]

const buildControls = (props) => {
    let countOfIngredients = Object.keys(props.ingredients)
        .map(keyIng => {
            return [...Array(props.ingredients[keyIng])]
                // .map((_, i) => {
                // return <BurgerIngredient key={keyIng + i} type={keyIng}/>
           // })
        })
    // .reduce((arr, el)=>{
    //     return arr.concat(el)
    // }, [])
    console.log(countOfIngredients);


    return (
        <div className={classes.BuildControls}>
            {controls.map((ctrl,index) => (
                <BuildControl
                    quantityOfIngredients={countOfIngredients[index].length}
                    key={ctrl.label}
                    label={ctrl.label}
                    add={() => {
                        props.addMore(ctrl.type)
                    }}
                    less={() => {
                        props.lessIng(ctrl.type)
                    }}
                />
            ))}
        </div>)
}

export default buildControls;