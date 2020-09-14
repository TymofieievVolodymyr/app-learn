import React, {Component} from "react";

import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../componentns/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../componentns/Navigation/SideDrawer/SideDrawer"

//import {render} from "react-dom";

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleMenuHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar toggle={this.toggleMenuHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }

}

export default Layout;
