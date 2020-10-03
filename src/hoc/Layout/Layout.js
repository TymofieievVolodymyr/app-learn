import React, {Component} from "react";
import {connect} from 'react-redux';

import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../componentns/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../componentns/Navigation/SideDrawer/SideDrawer"

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
                <Toolbar auth = {this.props.isAuthenticated}
                         toggle={this.toggleMenuHandler}/>
                <SideDrawer
                    auth = {this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}


export default connect(mapStateToProps)(Layout);
