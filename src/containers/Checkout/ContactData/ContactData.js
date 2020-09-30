import React, {Component} from "react";

import Button from "../../../componentns/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../componentns/UI/Spinner/Spinner"
import Input from "../../../componentns/UI/Input/Input"
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreator from "../../../store/actions/index"

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
                touched: false,
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
                touched: false,
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
                    minLength: 2,
                    maxLength: 5,
                    isNumeric: true,
                },
                valid: false,
                touched: false,
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
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your E-mail'
                },
                value: 'Vovanum@gmail.com',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: true,
                touched: false,
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
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {
                    required: true,
                },
                value: 'fastest',
                valid: true,
                touched: false,
            }
        },
        isValid: false
    }

    contactDataCheckValidity(value, rules) {

        let isValid = true;
        console.log(rules.isNumeric);

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        // if (rules.isEmail) {
        //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        //     isValid = pattern.test(value) && isValid
        // }

        if (rules.isNumeric) {
            console.log('Checking here!!!!');
            const pattern = /^\d+$/;
            let foo = pattern.test(value);
            console.log(foo);
            isValid = foo && isValid;
        }

        return isValid;
    }

    contactDataOrderHandler = async (event) => {
        event.preventDefault();

        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value
        }

        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData: formData,
        }

        this.props.onOrderBurger(order);
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
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.contactDataCheckValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement.valid);
        updatedForm[inputIdentifier] = updatedFormElement;

        let verifiedForm = true;
        for (let key in updatedForm) {
            verifiedForm = updatedForm[key].valid && verifiedForm;
        }

        console.log(verifiedForm);

        //console.log(updatedForm);
        this.setState({
            orderForm: updatedForm,
            isValid: verifiedForm,
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
                    shouldValid={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event) => {
                        this.contactDataChangedHandler(event, formElement.id)
                    }}
                />
            ))
            }
            <Button btnType="Success" disabled={!this.state.isValid}>ORDER</Button>
        </form>);

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ing: state.bur.ingredients,
        price: state.bur.totalPrice,
        loading: state.ord.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => {
            dispatch(actionCreator.purchaseBurger(orderData));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
