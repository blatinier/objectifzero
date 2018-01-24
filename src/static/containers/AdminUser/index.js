import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AdminMenu from '../AdminMenu';
import ShortUserView from '../User';
import * as actionCreators from '../../actions/users';

class AdminUserView extends React.Component {
    componentWillMount() {
        const { actions, token } = this.props;
        actions.usersFetch(token);
    }

    goToAddUser = () => {
        this.props.dispatch(push('/zw-admin/user-add'));
    }

    render() {
        const { users, isFetching } = this.props;
        return (
            <div className="protected">
                <AdminMenu />
                <a onClick={this.goToAddUser} className="btn btn-default btn-circle">
                    <i className="fa fa-plus" />
                </a>
                <div className="col-lg-9">
                    {(isFetching || !users) ?
                        <p className="text-center">Loading users...</p>
                        :
                        <div>
                            {users.map(user => <ShortUserView admin key={user.email} user={user} />)}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

AdminUserView.defaultProps = {
    users: []
};

AdminUserView.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        usersFetch: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = (state) => {
    const { users: usersState, auth } = state;
    const users = usersState.users || [];
    return {
        token: auth.token,
        users,
        isFetching: usersState.isFetchingUsers,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView);
export { AdminUserView as AdminUserViewNotConnected };
