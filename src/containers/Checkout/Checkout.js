import React, {Component} from "react";

import CheckoutSummary from "../../componentns/Order/CheckoutSummary/CheckoutSummary"
import axios from "../../axios-orders";

class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         meat: 1,
    //         cheese: 1,
    //         beacon: 0,
    //         salad: 0,
    //     },
    // }
    state = {
        ingredients: null,
    }


    async componentDidMount() {
        try {
            const response = await axios.get('/ingredients.json');
            this.setState({
                ingredients: response.data
            });
        } catch (err) {
            this.setState({
                error: true,
            });
        }
    }

    checkoutCloseHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let checkoutSummary = <p>Loading...</p>
        if (this.state.ingredients) {
            checkoutSummary = <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutClose={this.checkoutCloseHandler}
                checkoutContinue={this.checkoutContinueHandler}
            />
        }

        return (
            <div>
                {checkoutSummary}
            </div>
        );
    }
}

export default Checkout;



