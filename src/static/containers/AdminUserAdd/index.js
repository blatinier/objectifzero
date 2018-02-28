import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import AdminMenu from '../AdminMenu';
import * as actionCreators from '../../actions/users';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    email: t.String,
    password: t.String,
    gender: t.enums({ M: 'Male', F: 'Female' }),
    is_staff: t.Boolean,
    has_garden: t.Boolean,
    home_owner: t.Boolean,
    do_smoke: t.Boolean
});

const UserEdit = t.struct({
    username: t.String,
    email: t.String,
    gender: t.enums({ M: 'Male', F: 'Female' }),
    is_staff: t.Boolean,
    has_garden: t.Boolean,
    home_owner: t.Boolean,
    do_smoke: t.Boolean
});

class AdminUserAddView extends Component {
    state = {
        editing: false,
        formValues: {
            username: '',
            email: '',
            password: '',
            gender: 'M',
            is_staff: false,
            has_garden: false,
            home_owner: false,
            do_smoke: false,
        },
    };

    componentWillMount = () => {
        const { actions, token, match } = this.props;
        if (match.params.username) {
            actions.userFetch(token, match.params.username);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.user_data) {
            this.setState({
                formValues: nextProps.user_data,
                editing: true,
            });
        }
    };

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    createUser = (e) => {
        e.preventDefault();
        const value = this.addUserForm.getValue();
        const formData = Object.assign({}, value);
        if (formData) {
            if (this.state.editing) {
                const { username } = this.props.match.params;
                this.props.actions.editUser(this.props.token, username, formData);
            } else {
                this.props.actions.createUser(this.props.token, formData);
            }
        }
    };

    render = () => (
        <div className="protected">
            <AdminMenu />
            {(this.props.isFetchingUser === true) ?
                <p className="text-center">Loading user to edit...</p>
                :
                <Col lg={18}>
                    <form onSubmit={this.createUser}>
                        <Form ref={(ref) => { this.addUserForm = ref; }}
                            type={this.state.editing ? UserEdit : User}
                            value={this.state.formValues}
                            onChange={this.onFormChange}
                        />
                        <button type="submit" className="btn btn-success col-lg-4 col-lg-offset-4 col-xs-12">
                            { this.state.editing ? 'Edit user!' : 'Create User!'}
                        </button>
                    </form>
                </Col>
            }
        </div>
    );
}

AdminUserAddView.defaultProps = {
    match: null,
    user_data: null
};

AdminUserAddView.propTypes = {
    token: PropTypes.string.isRequired,
    isFetchingUser: PropTypes.bool.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            username: PropTypes.string
        })
    }),
    actions: PropTypes.shape({
        createUser: PropTypes.func.isRequired,
        editUser: PropTypes.func.isRequired,
        userFetch: PropTypes.func.isRequired
    }).isRequired,
    user_data: PropTypes.shape({
        username: PropTypes.string,
        gender: PropTypes.string,
        password: PropTypes.string,
        has_garden: PropTypes.bool,
        home_owner: PropTypes.bool,
        do_smoke: PropTypes.bool,
        email: PropTypes.string,
        is_staff: PropTypes.bool
    }),
};


const mapStateToProps = state => ({
    token: state.auth.token,
    user_data: state.users.user,
    isFetchingUser: state.users.isFetchingUser,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserAddView);
export { AdminUserAddView as AdminUserAddViewNotConnected };
