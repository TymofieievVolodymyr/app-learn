import React, {Component} from "react";
import Modal from '../../componentns/UI/Modal/Modal';
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        // state = {
        //     error: null,
        // }
        //
        // UNSAFE_componentWillMount() {
        //     axios.interceptors.request.use(reg => {
        //         this.setState({error: null})
        //         return reg;
        //     });
        //     axios.interceptors.response.use(req => req, error => {
        //         this.setState({error: error})
        //     });
        // }

        constructor(props) {
            super(props);
            this.state = {
                error: null,
            }

            this.reqInterceptor = axios.interceptors.request.use(reg => {
                this.setState({error: null})
                return reg;
            });
            this.resInterceptor = axios.interceptors.response.use(req => req, error => {
                this.setState({error: error})
            });

        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }


        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        close={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;