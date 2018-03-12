import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Col, Form, Icon, Input, Layout, Select, Switch } from 'antd';

import AdminMenu from './AdminMenu';
import * as actionCreators from '../actions/users';
import { generateForm } from '../utils/generateForm';
import { createUserFields, editUserFields } from '../utils/forms/user';

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
            form,
        } = this.props;
        const initialData = {
            username: get(this.props, 'user_data.username', ''),
            email: get(this.props, 'user_data.email', ''),
            is_staff: get(this.props, 'user_data.is_staff', false),
            has_garden: get(this.props, 'user_data.has_garden', false),
            home_owner: get(this.props, 'user_data.home_owner', false),
            do_smoke: get(this.props, 'user_data.do_smoke', false),
            gender: get(this.props, 'user_data.gender', 'M'),
        };
        let userForm
        if (this.state.editing) {
            userForm = generateForm(form, this.createUser, editUserFields, initialData, 'Edit User!');
        } else {
            userForm = generateForm(form, this.createUser, createUserFields, initialData, 'Create User!');
        }

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
                            {userForm}
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
