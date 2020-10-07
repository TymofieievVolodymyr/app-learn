import React, {Component} from "react";

import Button from "../../../componentns/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../componentns/UI/Spinner/Spinner"
import Input from "../../../componentns/UI/Input/Input"
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreator from "../../../store/actions/index"
import {updateObject, сheckValidity} from "../../../shared/utility";

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
            userId: this.props.userId,
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    contactDataChangedHandler = (event, inputIdentifier) => {


        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: сheckValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        if (event.target.type === 'checkbox') {
            updatedFormElement.value = event.target.checked;
        } else {
            updatedFormElement.value = event.target.value;

        }

        const updatedForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let verifiedForm = true;
        for (let key in updatedForm) {
            verifiedForm = updatedForm[key].valid && verifiedForm;
        }

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
                    shouldValidate={formElement.config.validation}
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
