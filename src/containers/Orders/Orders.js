import React, {Component} from "react";

import Order from "../../componentns/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../componentns/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionCreator from "../../store/actions/index"

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner/>;

        if (!this.props.loading) {
            orders = this.props.orders.map((orderItem) => {
                return <Order
                    ingredients={orderItem.ingredients}
                    key={orderItem.id}
                    price={orderItem.price}
                />
            });
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        orders: state.ord.orders,
        loading: state.ord.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreator.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(withErrorHandler(Orders, axios));