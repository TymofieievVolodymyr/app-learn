import React, {Component} from "react";

import Button from "../../../componentns/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../componentns/UI/Spinner/Spinner"
import Input from "../../../componentns/UI/Input/Input"

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    contactDataOrderHandler = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        try {
            const order = {
                ingredients: this.props.ingredients,
                price: +this.props.price.toFixed(2),
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
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (<form>
            {formElementsArray.map((formElement) => {
                return <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    key={formElement.id}
                />
            })
            }
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