import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AdminMenu from '../AdminMenu';
import ShortUserView from '../User';
import ShortUserViewNotConnected from '../User';
import * as actionCreators from '../../actions/users';

class AdminUserView extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        users: PropTypes.arrayOf(
            PropTypes.instanceOf(ShortUserViewNotConnected)
        ),
        token: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            usersFetch: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        users: []
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.usersFetch(token);
    }

    render() {
        const { users } = this.props;
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                    {(this.props.isFetching === true || users === null) ?
                        <p className="text-center">Loading users...</p>
                        :
                        <div>
                            {users.map(user => <ShortUserView key={user.email} user={user} />)}
                        </div>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    let users = Array();
    if (state.users) {
        users = state.users.users;
    }
    return {
        token: state.auth.token,
        users: users,
        isFetching: state.users.isFetchingUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView);
export { AdminUserView as AdminUserViewNotConnected };