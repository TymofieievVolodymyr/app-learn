import React from "react";

import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl"

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Beacon', type: 'beacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl
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
    </div>
)

export default buildControls;