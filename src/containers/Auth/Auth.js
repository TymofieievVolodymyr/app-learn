import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from "../../componentns/UI/Button/Button";
import Input from "../../componentns/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from '../../store/actions/index';
import Spinner from "../../componentns/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import * as action from "../../store/actions";
import {updateObject, сheckValidity} from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
    }

    componentDidMount() {
        if (!this.props.buildBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangedHandler = (event, controlName) => {
        // const updatedControls = updateObject(this.state.controls, {
        //     [controlName]: updateObject(this.state.controls[controlName], {
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: сheckValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     })
        // })

        const updatedControlElement = updateObject( this.state.controls[controlName], {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: сheckValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        })

        const updatedForm = updateObject(this.state.controls, {
            [controlName]: updatedControlElement
        })

        //
        // const updatedControls = {
        //     ...this.state.controls,
        //     [controlName]: {
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touched: true
        //     }
        // };


        //this.setState({controls: updatedControls});
        this.setState({controls: updatedForm});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);

    }

    switchAuthModelHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        if (this.props.loading) {
            form = <Spinner/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
            console.log(this.props.error);
        }

        const authRedirect = this.props.isAuth ? <Redirect to={this.props.authRedirectPath}/> : null

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button btnType="Danger"
                            clicked={this.switchAuthModelHandler}>{this.state.isSignup ? 'SIGN IN (first time)' : 'SIGN UP (already registered)'}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildBurger: state.bur.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);