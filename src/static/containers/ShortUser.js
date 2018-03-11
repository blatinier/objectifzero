import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Card, Col, Icon } from 'antd';

import * as actionCreators from '../actions/users';

class ShortUserView extends Component {
    deleteUser = () => {
        const { actions, token, user } = this.props;
        actions.deleteUser(token, user.username);
    };

    goToEditUser = () => {
        const { username } = this.props.user;
        this.props.dispatch(push(`/zw-admin/user-edit/${username}`));
    }

    render = () => {
        const { user, admin } = this.props;
        const adminBtns = [];
        if (admin) {
            const { username } = user;
            adminBtns.push(<Icon
                type="delete"
                key={`delete-btn-${username}`}
                onClick={this.deleteUser}
            />);
            adminBtns.push(<Icon
                type="edit"
                key={`edit-btn-${username}`}
                onClick={this.goToEditUser}
            />);
        }
        return (
            <Card title={user.username} extra={adminBtns}>
                <Col lg={20}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </Col>
            </Card>
        );
    };
}

ShortUserView.propTypes = {
    admin: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        has_garden: PropTypes.bool.isRequired,
        do_smoke: PropTypes.bool.isRequired,
        home_owner: PropTypes.bool.isRequired,
        is_staff: PropTypes.bool.isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        deleteUser: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortUserView);
