import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Col, Form, Icon, Input, Layout, Select, Switch } from 'antd';

import AdminMenu from './AdminMenu';
import * as actionCreators from '../actions/users';

const { Sider, Content } = Layout;
const { Option } = Select;

class AdminUserAdd extends Component {
    state = {
        editing: false,
    };

    componentWillMount = () => {
        const {
            actions: { userFetch },
            token,
            match: { params: { username } },
        } = this.props;
        if (username) {
            userFetch(token, username);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.user_data) {
            this.setState({ editing: true });
        }
    };

    createUser = (e) => {
        e.preventDefault();
        const {
            token,
            form: { validateFields },
            actions: { editUser, createUser },
        } = this.props;

        validateFields((err, values) => {
            if (this.state.editing) {
                const { username } = this.props.match.params;
                editUser(token, username, values);
            } else {
                createUser(token, values);
            }
        });
    };

    render() {
        const {
            isFetchingUser,
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Layout>
                <Sider>
                    <AdminMenu />
                </Sider>
                <Content>
                    {(isFetchingUser === true) ?
                        <p className="text-center">Loading user to edit...</p>
                        :
                        <Col lg={12} offset={6}>
                            <Form onSubmit={this.createUser}>
                                <Form.Item label="Username">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Saisissez un nom d\'utilisateur' }],
                                        initialValue: get(this.props, 'user_data.username', ''),
                                    })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
                                </Form.Item>
                                <Form.Item label="Email">
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Saisissez un email' }],
                                        initialValue: get(this.props, 'user_data.email', ''),
                                    })(<Input prefix={<Icon type="mail" />} placeholder="Email" />)}
                                </Form.Item>
                                { !this.state.editing ?
                                    <Form.Item label="Mot de passe">
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Saisissez un mot de passe' }],
                                        })(<Input
                                            prefix={<Icon type="lock" />}
                                            type="password"
                                            placeholder="Mot de passe"
                                        />)}
                                    </Form.Item>
                                    : null }
                                <Form.Item>
                                    {getFieldDecorator('is_staff', {
                                        valuePropName: 'checked',
                                        initialValue: get(this.props, 'user_data.is_staff', false),
                                    })(<Switch />)} Admin
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('has_garden', {
                                        valuePropName: 'checked',
                                        initialValue: get(this.props, 'user_data.has_garden', false),
                                    })(<Switch />)} Jardin
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('home_owner', {
                                        valuePropName: 'checked',
                                        initialValue: get(this.props, 'user_data.home_owner', false),
                                    })(<Switch />)} Propriétaire
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('do_smoke', {
                                        valuePropName: 'checked',
                                        initialValue: get(this.props, 'user_data.do_smoke', false),
                                    })(<Switch />)} Fumeur
                                </Form.Item>
                                <Form.Item label="Sexe">
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: true, message: 'Please select a value' }],
                                        initialValue: get(this.props, 'user_data.gender', 'M'),
                                    })(
                                        <Select>
                                            <Option value="M">Male</Option>
                                            <Option value="F">Female</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Button htmlType="submit">
                                    { this.state.editing ? 'Edit user!' : 'Create User!'}
                                </Button>
                            </Form>
                        </Col>
                    }
                </Content>
            </Layout>
        );
    }
}

AdminUserAdd.defaultProps = {
    match: null,
    user_data: null,
};

AdminUserAdd.propTypes = {
    token: PropTypes.string.isRequired,
    isFetchingUser: PropTypes.bool.isRequired,
    form: PropTypes.shape().isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            username: PropTypes.string,
        }),
    }),
    actions: PropTypes.shape({
        createUser: PropTypes.func.isRequired,
        editUser: PropTypes.func.isRequired,
        userFetch: PropTypes.func.isRequired,
    }).isRequired,
    user_data: PropTypes.shape({
        username: PropTypes.string,
        gender: PropTypes.string,
        password: PropTypes.string,
        has_garden: PropTypes.bool,
        home_owner: PropTypes.bool,
        do_smoke: PropTypes.bool,
        email: PropTypes.string,
        is_staff: PropTypes.bool,
    }),
};

const mapStateToProps = state => ({
    token: state.auth.token,
    user_data: state.users.user,
    isFetchingUser: state.users.isFetchingUser,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedAdminUserAdd = connect(mapStateToProps, mapDispatchToProps)(AdminUserAdd);
export default Form.create()(ConnectedAdminUserAdd);
