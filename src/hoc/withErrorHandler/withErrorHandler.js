import React, {useState, useEffect} from "react";
import Modal from '../../componentns/UI/Modal/Modal';
import Auxiliary from "../Auxiliary/Auxiliary";


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(reg => {
            setError(null);
            return reg;
        });
        const resInterceptor = axios.interceptors.response.use(req => req, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor)
                axios.interceptors.response.eject(resInterceptor)
            }
        }, [reqInterceptor, resInterceptor]);

        // componentWillUnmount()
        // {
        //     axios.interceptors.request.eject(this.reqInterceptor)
        //     axios.interceptors.response.eject(this.resInterceptor)
        // }

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Auxiliary>
                <Modal
                    show={error}
                    close={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Auxiliary>
        );
    }
}

export default withErrorHandler;