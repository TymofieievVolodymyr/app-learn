import React from "react";

import classes from './Orders.module.css';

const order = props => (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price<strong>5.2</strong></p>
    </div>
)

export default order;