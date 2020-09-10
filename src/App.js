import React, {Component} from 'react';

import Layout from "./componentns/Layout/Layout";

import BurgerBuilder from "./componentns/BurgerBuilder/BurgerBuilder";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <BurgerBuilder/>
                </Layout>
            </div>
        );
    }
}

export default App;
