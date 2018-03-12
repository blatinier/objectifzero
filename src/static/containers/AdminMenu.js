import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'antd';

class AdminMenu extends React.Component {
    handleMenu = (e) => {
        const urlMap = {
            adminUsers: '/zw-admin/user',
            adminCards: '/zw-admin/card',
        };
        this.props.dispatch(push(urlMap[e.key]));
    };

    render = () => (
        <Menu theme="dark" onClick={this.handleMenu}>
            <Menu.Item key="adminUsers"><Icon type="user" /> Users</Menu.Item>
            <Menu.Item key="adminCards"><Icon type="credit-card" /> Cards</Menu.Item>
        </Menu>
    );
}

AdminMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(AdminMenu);
