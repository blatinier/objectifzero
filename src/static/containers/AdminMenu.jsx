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
        <Menu theme="dark" onClick={this.handleMenu} defaultSelectedKeys={[this.props.selectedMenu]}>
            <Menu.Item key="adminUsers"><Icon type="user" /> Utilisateurs</Menu.Item>
            <Menu.Item key="adminCards"><Icon type="credit-card" /> Cartes</Menu.Item>
        </Menu>
    );
}

AdminMenu.defaultProps = {
    selectedMenu: 'adminUsers',
};

AdminMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    selectedMenu: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(AdminMenu);
