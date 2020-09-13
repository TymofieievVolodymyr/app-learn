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
    return (
        <div className={classes.BuildControls}>
            {controls.map((ctrl,index) => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    add={() => {
                        props.addMore(ctrl.type)
                    }}
                    less={() => {
                        props.lessIng(ctrl.type)
                    }}
                    disable={props.disable[ctrl.type]}
                />
            ))}
        </div>)
}

export default buildControls;