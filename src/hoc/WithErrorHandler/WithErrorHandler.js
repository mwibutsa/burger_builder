import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.requestInterceptor = axios.interceptors.request.use(
        (request) => {
          this.setState({ error: null });
          return request;
        },
        (error) => {
          this.setState({ error });
        }
      );

      this.responseInterceptor = axios.interceptors.response.use(
        (response) => {
          this.setState({ error: null });
          return response;
        },
        (error) => this.setState({ error })
      );
      this.state = {
        error: null,
      };
    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      let errorMessage = null;
      try {
        if (this.state.error) {
          errorMessage = this.state.error.response.data.error;
        }
      } catch (err) {
        errorMessage = this.state.error.message;
      }

      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? errorMessage : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default WithErrorHandler;
