import React, {useState} from "react";

import Button from "../../../componentns/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../componentns/UI/Spinner/Spinner"
import Input from "../../../componentns/UI/Input/Input"
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreator from "../../../store/actions/index"
import {updateObject, сheckValidity} from "../../../shared/utility";

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
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
    })

    const [formIsValid, setFormIsValid] = useState(false);
    
    const contactDataOrderHandler = async (event) => {
        event.preventDefault();

        const formData = {};
        for (let formIdentifier in orderForm) {
            formData[formIdentifier] = orderForm[formIdentifier].value
        }

        const order = {
            ingredients: props.ing,
            price: props.price,
            orderData: formData,
            userId: props.userId,
        }

        props.onOrderBurger(order, props.token);
    }

    const contactDataChangedHandler = (event, inputIdentifier) => {


        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: сheckValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        if (event.target.type === 'checkbox') {
            updatedFormElement.value = event.target.checked;
        } else {
            updatedFormElement.value = event.target.value;

        }

        const updatedForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let verifiedForm = true;
        for (let key in updatedForm) {
            verifiedForm = updatedForm[key].valid && verifiedForm;
        }
        setOrderForm(updatedForm);
        setFormIsValid(verifiedForm);

    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        })
    }

    let form = (<form onSubmit={contactDataOrderHandler}>
        {formElementsArray.map((formElement) => (
            <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                key={formElement.id}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event) => {
                    contactDataChangedHandler(event, formElement.id)
                }}
            />
        ))
        }
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
    </form>);

    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ing: state.bur.ingredients,
        price: state.bur.totalPrice,
        loading: state.ord.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => {
            dispatch(actionCreator.purchaseBurger(orderData, token));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
