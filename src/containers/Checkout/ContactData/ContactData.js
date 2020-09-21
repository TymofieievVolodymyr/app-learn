import React, {Component} from "react";

import Button from "../../../componentns/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../componentns/UI/Spinner/Spinner"

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            popState: ''
        },
        loading: false,

    }


    contactDataOrderHandler = async (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.props.price);
        this.setState({
            loading: true,
        });
        try {
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customer: {
                    name: 'Vovanium',
                    address: {
                        street: 'Burshtinova street',
                        zipCode: '49108',
                        country: 'Ukraine',
                    },
                    email: 'vovanium.timofeev@gmail.com',
                    deliveryMethod: 'fastest',
                }
            }

            const response = await axios.post('/orders.json', order);
            console.log(response);
            this.setState({
                loading: false,
            });
            this.props.history.push('/')

        } catch (error) {
            this.setState({
                loading: false,
            });
            //console.log(error)
        }
    }

    // async componentDidMount() {
    //     //console.log('[Contact Data] componentDidMount');
    //     this.setState({
    //         loading: true,
    //     });
    //     try {
    //         const order = {
    //             ingredients: this.state.ingredients,
    //             price: this.state.totalPrice.toFixed(2),
    //             customer: {
    //                 name: 'Vovanium',
    //                 address: {
    //                     street: 'Burshtinova street',
    //                     zipCode: '49108',
    //                     country: 'Ukraine',
    //                 },
    //                 email: 'vovanium.timofeev@gmail.com',
    //                 deliveryMethod: 'fastest',
    //             }
    //         }
    //
    //         const response = await axios.post('/orders.json', order);
    //         //console.log(response);
    //         this.setState({
    //             loading: false,
    //         });
    //
    //     } catch (error) {
    //         this.setState({
    //             loading: false,
    //         });
    //         //console.log(error)
    //     }
    // }

    render() {
        let form = (<form>
            <input type="text" name="name" placeholder="name" className={classes.Input}/>
            <input type="email" name="email" placeholder="email" className={classes.Input}/>
            <input type="text" name="street" placeholder="street" className={classes.Input}/>
            <input type="text" name="postal" placeholder="postal" className={classes.Input}/>
            <Button btnType="Success" clicked={this.contactDataOrderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;