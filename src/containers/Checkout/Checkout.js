import React from "react";

import CheckoutSummary from "../../componentns/Order/CheckoutSummary/CheckoutSummary"
//import axios from "../../axios-orders";
import {Route, Redirect, withRouter} from "react-router-dom";
import ContactData from "./ContactData/ContactData"
import {connect} from "react-redux";

const Checkout = props => {

    const checkoutCloseHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let checkoutSummary = <Redirect to={'/'}/>

    if (props.ing) {
        const purchasedRedirect = props.purchased ? <Redirect to={'/'}/> : null;
        checkoutSummary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ing}
                    checkoutClose={checkoutCloseHandler}
                    checkoutContinue={checkoutContinueHandler}/>
                <Route
                    path={props.match.path + '/contact-data'} component={ContactData}
                />
            </div>
        );

    }

    return checkoutSummary;
}

const mapStateToProps = state => {
    return {
        ing: state.bur.ingredients,
        purchased: state.ord.purchased,
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));



