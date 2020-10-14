import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import Button from "../../componentns/UI/Button/Button";
import Input from "../../componentns/UI/Input/Input";
import classes from "./Auth.module.css";
import * as actions from '../../store/actions/index';
import Spinner from "../../componentns/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import * as action from "../../store/actions";
import {updateObject, сheckValidity} from "../../shared/utility";

const Auth = props => {

    const [controls, setControls] = useState({
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
    })

    const [signedUp, setSignetUp] = useState(true);

    useEffect(() => {
        if (!props.buildBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath('/');
        }
    }, [])

    const inputChangedHandler = (event, controlName) => {

        const updatedControlElement = updateObject(controls[controlName], {
            ...controls[controlName],
            value: event.target.value,
            valid: сheckValidity(event.target.value, controls[controlName].validation),
            touched: true
        })

        const updatedForm = updateObject(controls, {
            [controlName]: updatedControlElement
        })
        setControls(updatedForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, signedUp);
    }

    const switchAuthModelHandler = (event) => {
        event.preventDefault();
        setSignetUp(signedUp => !signedUp)
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
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
            changed={(event) => inputChangedHandler(event, formElement.id)}/>
    ));

    if (props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
        console.log(props.error);
    }

    const authRedirect = props.isAuth ? <Redirect to={props.authRedirectPath}/> : null

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                <Button btnType="Danger"
                        clicked={switchAuthModelHandler}>{signedUp ? 'SIGN IN (first time)' : 'SIGN UP (already registered)'}</Button>
            </form>
        </div>
    );
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
        onAuth: (email, password, signedUp) => dispatch(actions.auth(email, password, signedUp)),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);