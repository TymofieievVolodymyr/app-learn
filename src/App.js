import React, {useEffect, Suspense} from 'react';

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout"
//import Checkout from "./containers/Checkout/Checkout"
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
//import Orders from "./containers/Orders/Orders";
import {connect} from "react-redux"
import * as action from "./store/actions/index"

const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout")
});

const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth")
});

const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders")
});

const App = props => {

    useEffect(() => {
        props.onAutoSignedUp();
    }, [])

    // componentDidMount() {
    //     this.props.onAutoSignedUp();
    // }

    let routes = (
        <Switch>
            <Route path='/auth' render={props => <Auth {...props}/>}/>
            <Route path='/' exact component={props => <BurgerBuilder {...props}/>}/>
            <Redirect to='/'/>
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path='/checkout' render={props => <Checkout {...props}/>}/>
                <Route path='/orders' render={props => <Orders {...props}/>}/>
                <Route path='/auth' render={props => <Auth {...props}/>}/>
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
                    <Suspense fallback={<p>Loading...</p>}>
                        {routes}
                    </Suspense>
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
