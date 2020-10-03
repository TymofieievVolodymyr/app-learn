import React, {Component} from 'react';

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout"
import Checkout from "./containers/Checkout/Checkout"
import {Route, BrowserRouter, Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path='/checkout' component={Checkout}/>
                            <Route path='/orders' component={Orders}/>
                            <Route path='/auth' component={Auth}/>
                            <Route path='/logout' component={Logout}/>
                            <Route path='/' exact component={BurgerBuilder}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
