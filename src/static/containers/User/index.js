import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/users';

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
            adminBtns.push(<i key={`delete-btn-${username}`}
                className="cursor fa fa-times"
                onClick={this.deleteUser}
            />);
            adminBtns.push(<i key={`edit-btn-${username}`}
                className="cursor fa fa-pencil"
                onClick={this.goToEditUser}
            />);
        }
        return (
            <div className="panel panel-default user">
                <div className="panel-body">
                    <div className="row">
                        {adminBtns}
                    </div>
                    <div className="col-lg-10">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        );
    };
}

ShortUserView.defaultProps = {
    admin: false
};

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
        deleteUser: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortUserView);
export { ShortUserView as ShortUserViewNotConnected };
