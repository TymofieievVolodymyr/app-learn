import React, {Component} from 'react';

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout"
import {Route, BrowserRouter, Redirect, Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path='/checkout' component={Checkout}/>
                            <Route path='/' exact component={BurgerBuilder}/>
                            {/*<Redirect from='/' to='/burgerbuilder'></Redirect>*/}
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
