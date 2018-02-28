import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Alert, Button, Icon, Input, Form, Row, Col } from 'antd';

import * as actionCreators from '../actions/auth';

class Register extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
    }

    handleRegister = (e) => {
        e.preventDefault();
        const { form: { validateFields }, actions: { authRegisterUser } } = this.props;
        validateFields((err, values) => {
            if (!err) {
                authRegisterUser(values.username, values.email, values.password);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Les deux mots de passe ne sont pas identiques.');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { isAuthenticating, statusText, form: { getFieldDecorator } } = this.props;
        let statusTextNode = null;
        let statusType = null;
        if (statusText) {
            if (statusText.indexOf('Authentication Error') === 0) {
                statusType = 'error';
            } else {
                statusType = 'success';
            }

            statusTextNode = (
                <Row>
                    <Col span={24}>
                        <Alert type={statusType} message={statusText} />
                    </Col>
                </Row>
            );
        }

        return (
            <Row type="flex" justify="space-around">
                <Col span={12}>
                    <h1 className="text-center">S&#39;inscrire</h1>
                    {statusTextNode}
                    <Form onSubmit={this.handleRegister}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Saisissez un nom d\'utilisateur' }],
                            })(
                                <Input prefix={<Icon type="user" />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Saisissez votre e-mail' }],
                            })(
                                <Input prefix={<Icon type="mail" />} placeholder="Email" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Saisissez votre mot de passe' },
                                        { validator: this.checkConfirm }],
                            })(
                                <Input prefix={<Icon type="lock" />} type="password" placeholder="Mot de passe" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('passwordConfirmation', {
                                rules: [{ required: true, message: 'Confirmez votre mot de passe' },
                                        { validator: this.checkPassword }],
                            })(
                                <Input prefix={<Icon type="lock" />}
                                    type="password"
                                    placeholder="Confirmation"
                                    onBlur={this.handleConfirmBlur}
                                />
                            )}
                        </Form.Item>
                        <Button disabled={isAuthenticating} htmlType="submit">
                            S&#39;inscrire !
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

Register.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    statusText: PropTypes.string,
    actions: PropTypes.shape({
        authRegisterUser: PropTypes.func.isRequired,
    }).isRequired
};

Register.defaultProps = {
    statusText: ''
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

const ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);
export default Form.create()(ConnectedRegister);
