import React, {useEffect} from 'react';
import classes from './Modal.module.css'
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop"

const Modal = props => {

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }

    return (
        <Auxiliary>
            <Backdrop
                show={props.show}
                clicked={props.close}
            />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Auxiliary>
    )
};
export default React.memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);