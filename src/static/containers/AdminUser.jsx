import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { push } from 'react-router-redux';
import { Col, Icon, Layout, Row } from 'antd';

import AdminMenu from './AdminMenu';
import ShortUser from './ShortUser';

const { Sider, Content } = Layout;

class AdminUser extends React.Component {
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
                <Fragment>
                    {users.map(user => <ShortUser admin key={user.email} user={user} />)}
                </Fragment>
            );
        }

        return (
            <Layout>
                <Sider>
                    <AdminMenu />
                </Sider>
                <Content>
                    <Row>
                        <a onClick={this.goToAddUser}>
                            <Icon type="plus-circle" style={{ fontSize: 30 }} />
                        </a>
                    </Row>
                    <Row>
                        <Col offset={3} span={18}>{usersDisplay}</Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

AdminUser.propTypes = {
    dispatch: PropTypes.func.isRequired,
    usersFetch: PropTypes.instanceOf(PromiseState).isRequired,
};

export default connect(({ token }) => ({
    usersFetch: {
        url: '/api/v1/accounts/list-add/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(AdminUser);
