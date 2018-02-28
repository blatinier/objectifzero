import React from 'react';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { push } from 'react-router-redux';
import { Col } from 'antd';

import AdminMenu from '../AdminMenu';
import ShortUserView from '../User';

class AdminUserView extends React.Component {
    goToAddUser = () => {
        this.props.dispatch(push('/zw-admin/user-add'));
    }

    render() {
        const { usersFetch } = this.props;
        let usersDisplay;
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

        return (
            <div className="protected">
                <AdminMenu />
                <a onClick={this.goToAddUser} className="btn btn-default btn-circle">
                    <i className="fa fa-plus" />
                </a>
                <Col lg={18}>{usersDisplay}</Col>
            </div>
        );
    }
}

AdminUserView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    usersFetch: PropTypes.instanceOf(PromiseState),
};

export default connect(({ token }) => ({
    usersFetch: {
        url: `/api/v1/accounts/list-add/`,
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(AdminUserView);
