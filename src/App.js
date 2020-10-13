import React, {useEffect} from 'react';

import Layout from "./hoc/Layout/Layout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout"
//import Checkout from "./containers/Checkout/Checkout"
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
//import Orders from "./containers/Orders/Orders";
import {connect} from "react-redux"
import * as action from "./store/actions/index"

const asyncCheckout = asyncComponent(()=>{
    return import("./containers/Checkout/Checkout")
});

const asyncAuth= asyncComponent(()=>{
    return import("./containers/Auth/Auth")
});

const asyncOrders = asyncComponent(()=>{
    return import("./containers/Orders/Orders")
});

const App = props => {

    useEffect(() => {
        props.onAutoSignedUp();
    })

        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/orders' component={asyncOrders}/>
                    <Route path='/auth' component={asyncAuth}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Redirect to='/'/>
                </Switch>
            )
        }

        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        {routes}
                    </Layout>
                </BrowserRouter>
            </div>
        );

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignedUp: () => dispatch(action.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
