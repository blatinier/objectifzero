import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import requireAuthentication from '../utils/requireAuthentication';
import ProfileInformation from './ProfileInformation';
import ProfileFriends from './ProfileFriends';
import ProfileFriendsAdd from './ProfileFriendsAdd';
import ProfileNotifications from './ProfileNotifications';

const { Sider, Content } = Layout;

const Profile = ({ match }) => (
    <Layout>
        <Sider>
            <Menu theme="dark" defaultSelectedKeys={['information']}>
                <Menu.Item key="information">
                    <Link to={`${match.url}/information`} className="nav-text">
                        Information
                    </Link>
                </Menu.Item>
                <Menu.Item key="friends">
                    <Link to={`${match.url}/friends`} className="nav-text">
                        Amis
                    </Link>
                </Menu.Item>
                 <Menu.Item key="notifications">
                    <Link to={`${match.url}/notifications`} className="nav-text">
                        Notifications
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Content>
            <Route path={`${match.url}/information`} component={requireAuthentication(ProfileInformation)} />
            <Route path={`${match.url}/friends`} component={requireAuthentication(ProfileFriends)} />
            <Route path={`${match.url}/friends-add`} component={requireAuthentication(ProfileFriendsAdd)} />
            <Route path={`${match.url}/notifications`} component={requireAuthentication(ProfileNotifications)} />
        </Content>
    </Layout>
);

Profile.propTypes = {
    match: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }),
};

export default Profile;
