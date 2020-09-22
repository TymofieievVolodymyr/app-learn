import React, {Component} from "react";

import Order from "../../componentns/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../componentns/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

class Orders extends Component {

    state = {
        orders: [],
        loading: false,
    }

    async componentDidMount() {
        this.setState({loading: true})

        try {
            const response = await axios.get('/orders.json')
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }

            this.setState({loading: false, orders: fetchedOrders})
            console.log(this.state);
        } catch (error) {
            this.setState({loading: false})
        }
    }

    render() {
        let orders = null;

        if (this.state.orders) {
            orders = this.state.orders.map((orderItem) => {
                return <Order
                    ingredients={orderItem.ingredients}
                    key={orderItem.id}
                    price={orderItem.price}
                />
            });
        }

        if (this.state.loading) {
            orders = <Spinner/>
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);