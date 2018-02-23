import React from 'react';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { push } from 'react-router-redux';

import AdminMenu from '../AdminMenu';
import ShortUserView from '../User';
import { SERVER_URL } from '../../utils/config';

const refetch = connect.defaults({
		  credentials: 'include'
})

class AdminUserView extends React.Component {
    goToAddUser = () => {
        this.props.dispatch(push('/zw-admin/user-add'));
    }

    render() {
        const { usersFetch } = this.props;
        let usersDisplay;
        if (usersFetch) {  // Needed to check if this is the NotConnected component
            if (usersFetch.pending) {
                usersDisplay = <p className="text-center">Loading users...</p>;
            } else if (usersFetch.fulfilled) {
                const users = usersFetch.value.results;
                usersDisplay = (
                    <div>
                        {users.map(user => <ShortUserView admin key={user.email} user={user} />)}
                    </div>
                );
            }
        }

        return (
            <div className="protected">
                <AdminMenu />
                <a onClick={this.goToAddUser} className="btn btn-default btn-circle">
                    <i className="fa fa-plus" />
                </a>
                <div className="col-lg-9">
                    {usersDisplay}
                </div>
            </div>
        );
    }
}

AdminUserView.propTypes = {
    dispatch: PropTypes.func.isRequired,
	usersFetch: PropTypes.instanceOf(PromiseState),
};

export default refetch(props => ({
	usersFetch: {
		url: `${SERVER_URL}/api/v1/accounts/list-add/`,
		force: true,
		headers: {
			Accept: 'application/json',
			Authorization: `Token ${props.token}`,
		},
	},
}))(AdminUserView);
export { AdminUserView as AdminUserViewNotConnected };
