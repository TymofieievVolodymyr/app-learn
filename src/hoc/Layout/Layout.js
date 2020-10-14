import React, {useState} from "react";
import {connect} from 'react-redux';

import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../componentns/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../componentns/Navigation/SideDrawer/SideDrawer"

const Layout = props => {

    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    }

    const toggleMenuHandler = () => {
        setSideDrawer(showSideDrawer => !showSideDrawer)
    }
    return (
        <Auxiliary>
            <Toolbar auth={props.isAuthenticated}
                     toggle={toggleMenuHandler}/>
            <SideDrawer
                auth={props.isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}


export default connect(mapStateToProps)(Layout);
