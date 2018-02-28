import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import * as actionCreators from '../../actions/auth';

const Form = t.form.Form;

const Login = t.struct({
    email: t.String,
    password: t.String
});

const LoginFormOptions = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password'
        }
    }
};

class LoginView extends Component {
    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';
        this.state = {
            formValues: {
                email: '',
                password: ''
            },
            redirectTo: redirectRoute
        };
    }

    componentWillMount() {
        const { isAuthenticated, dispatch } = this.props;
        if (isAuthenticated) {
            dispatch(push('/'));
        }
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    extractRedirect = (string) => {
        const match = string.match(/next=(.*)/);
        return match ? match[1] : '/';
    };

    login = (e) => {
        e.preventDefault();
        const value = this.loginForm.getValue();
        if (value) {
            this.props.actions.authLoginUser(value.email, value.password, this.state.redirectTo);
        }
    };

    render() {
        let statusText = null;
        if (this.props.statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
                'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
            });

            statusText = (
                <Row>
                    <Col sm={24}>
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </Col>
                </Row>
            );
        }

        return (
            <div className="container login">
                <h1 className="text-center">Connexion</h1>
                <div className="login-container margin-top-medium">
                    {statusText}
                    <form onSubmit={this.login}>
                        <Form ref={(ref) => { this.loginForm = ref; }}
                            type={Login}
                            options={LoginFormOptions}
                            value={this.state.formValues}
                            onChange={this.onFormChange}
                        />
                        <button disabled={this.props.isAuthenticating}
                            type="submit"
                            className="btn btn-default btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

LoginView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    statusText: PropTypes.string,
    actions: PropTypes.shape({
        authLoginUser: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        search: PropTypes.string.isRequired
    })
};

LoginView.defaultProps = {
    statusText: '',
    location: null
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
export { LoginView as LoginViewNotConnected };
