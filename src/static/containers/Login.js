import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Input, Form, Row, Col } from 'antd';

import * as actionCreators from '../actions/auth';

class Login extends Component {
    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.extractRedirect(this.props.location.search) || '/' : '/';
        this.state = {
            redirectTo: redirectRoute
        };
    }

    componentWillMount() {
        const { isAuthenticated, dispatch } = this.props;
        if (isAuthenticated) {
            dispatch(push('/'));
        }
    }

    extractRedirect = (string) => {
        const match = string.match(/next=(.*)/);
        return match ? match[1] : '/';
    };

    login = (e) => {
        e.preventDefault();
        const { redirectTo } = this.state;
        const { form: { validateFields }, actions: { authLoginUser } } = this.props;
        validateFields((err, values) => {
            if (!err) {
                authLoginUser(values.email, values.password, redirectTo);
            }
        });
    };

    render() {
        const { isAuthenticating, statusText, form: { getFieldDecorator } } = this.props;
        let statusTextNode = null;
        if (statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': statusText.indexOf('Authentication Error') === 0,
                'alert-success': statusText.indexOf('Authentication Error') !== 0
            });

            statusTextNode = (
                <Row>
                    <Col span={24}>
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </Col>
                </Row>
            );
        }

        return (
            <Row type="flex" justify="space-around">
                <Col span={12}>
                    {statusTextNode}
                    <Form onSubmit={this.login}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Saisissez votre e-mail' }],
                            })(
                                <Input prefix={<Icon type="mail" />} placeholder="Email" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Saisissez votre mot de passe' }],
                            })(
                                <Input prefix={<Icon type="lock" />} type="password" placeholder="Mot de passe" />
                            )}
                        </Form.Item>
                        <Button disabled={isAuthenticating} htmlType="submit">
                            Connexion !
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

Login.propTypes = {
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

Login.defaultProps = {
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

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Form.create()(ConnectedLogin);
