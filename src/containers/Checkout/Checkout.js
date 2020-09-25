import React, {Component} from "react";

import CheckoutSummary from "../../componentns/Order/CheckoutSummary/CheckoutSummary"
//import axios from "../../axios-orders";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData"
import {connect} from "react-redux";

class Checkout extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.query = new URLSearchParams(this.props.location.search);
    //     this.ingredients = {};
    //     this.price = null;
    //     for (let param of this.query.entries()) {
    //         if (param[0] === 'price') {
    //             this.price = +param[1];
    //         } else {
    //             this.ingredients[param[0]] = +param[1];
    //         }
    //     }
    //
    // }


    // state = {
    //     ingredients: this.ingredients,
    //     totalPrice: this.price
    // }
    // componentDidMount() {
    //     //console.log('[Checkout] ComponentDidMount ')
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     for (let param of query.entries()) {
    //         ingredients[param[0]] = +param[1];
    //     }
    //     this.setState({ingredients: ingredients})
    // }
    // UNSAFE_componentWillMount() {
    //     //console.log('[Checkout] ComponentDidMount ')
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = null;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = +param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }

    checkoutCloseHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log('[Checkout]  RENDER ')
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ing}
                    checkoutClose={this.checkoutCloseHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                <Route
                    path={this.props.match.path + '/contact-data'} component={ContactData}
                    // render={(props) => (
                    //     <ContactData ingredients={this.props.ing} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);



