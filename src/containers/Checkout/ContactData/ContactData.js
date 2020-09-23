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
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
            },
            withGift: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                },
                value: false,
                validation: {
                    required: false,
                },
                valid: false,
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

    contactDataCheckValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    contactDataOrderHandler = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        try {
            const formData = {};
            for (let formIdentifier in this.state.orderForm) {
                formData[formIdentifier] = this.state.orderForm[formIdentifier].value
            }

             console.log( +this.props.price.toFixed(2));

            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData

            }

            await axios.post('/orders.json', order);

            this.setState({
                loading: false,
            });
            this.props.history.push('/')

        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
            });
        }
    }


    contactDataChangedHandler = (event, inputIdentifier) => {

        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        if (event.target.type === 'checkbox') {
            //console.log(event.target.checked);
            updatedFormElement.value = event.target.checked;
        } else {
            updatedFormElement.value = event.target.value;
            console.log(updatedFormElement.value);
        }

        updatedFormElement.valid = this.contactDataCheckValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier] = updatedFormElement;
        //console.log(updatedForm);
        this.setState({
            orderForm: updatedForm,
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (<form onSubmit={this.contactDataOrderHandler}>
            {formElementsArray.map((formElement) => (
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    key={formElement.id}
                    changed={(event) => {
                        this.contactDataChangedHandler(event, formElement.id)
                    }}
                />
            ))
            }
            <Button btnType="Success">ORDER</Button>
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