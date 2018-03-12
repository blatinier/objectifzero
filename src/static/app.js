import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Col, Icon, Layout, Menu, Row } from 'antd';
import 'antd/dist/antd.css';

import { authLogoutAndRedirect } from './actions/auth';
import './app.css';

const { Header } = Layout;

class App extends Component {
    goTo = url => () => this.props.dispatch(push(url));

    handleMenu = (e) => {
        if (e.key === 'logout') {
            this.props.dispatch(authLogoutAndRedirect());
        } else {
            const urlMap = {
                admin: '/zw-admin/user',
                dashboard: '/dashboard',
                register: '/register',
                login: '/login',
            };
            this.props.dispatch(push(urlMap[e.key]));
        }
    };

    render() {
        const { isAuthenticated, isStaff, children } = this.props;
        const items = [];
        if (isAuthenticated) {
            if (isStaff) {
                items.push(<Menu.Item key="admin"><Icon type="lock" /> Admin</Menu.Item>);
            }
            items.push(<Menu.Item key="dashboard">Dashboard</Menu.Item>);
            items.push(<Menu.Item key="logout">Déconnexion</Menu.Item>);
        } else {
            items.push(<Menu.Item key="register">Inscription</Menu.Item>);
            items.push(<Menu.Item key="login">Connexion</Menu.Item>);
        }

        return (
            <Layout className="layout">
                <Header>
                    <Row type="flex" justify="space-between">
                        <Col span={6}>
                            <a onClick={this.goTo('/')}>Enjoy Zero Déchet</a>
                        </Col>
                        <Col span={6}>
                            <Menu className="main-menu" onClick={this.handleMenu} theme="dark" mode="horizontal">
                                {items}
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Layout>{children}</Layout>
            </Layout>
        );
    }
}

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isStaff: PropTypes.bool.isRequired,
    children: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isStaff: state.auth.isStaff,
});

export default connect(mapStateToProps)(App);
