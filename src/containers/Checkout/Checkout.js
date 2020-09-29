import React, {Component} from "react";

import CheckoutSummary from "../../componentns/Order/CheckoutSummary/CheckoutSummary"
//import axios from "../../axios-orders";
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData"
import {connect} from "react-redux";

class Checkout extends Component {

    checkoutCloseHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log('[Checkout]  RENDER ')

        let checkoutSummary = <Redirect to={'/'}/>

        if (this.props.ing) {
            const purchasedRedirect = this.props.purchased ? <Redirect to={'/'}/> : null;
            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        checkoutClose={this.checkoutCloseHandler}
                        checkoutContinue={this.checkoutContinueHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'} component={ContactData}
                    />
                </div>
            );

        }

        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.bur.ingredients,
        purchased: state.ord.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);



