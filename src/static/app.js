import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Button, Col, Icon, Layout, Menu, Modal, Row } from 'antd';
import 'antd/dist/antd.css';

import { authLogoutAndRedirect } from './actions/auth';
import './app.css';

const { Header, Footer } = Layout;

const MenuItem = ({ key, icon, name }) => (
    <Menu.Item key={key}>
        <Col xs={24} sm={6}><Icon type={icon} /></Col>
        <Col xs={0} sm={{ span: 16, offset: 2 }}>{name}</Col>
    </Menu.Item>
);

MenuItem.propTypes = {
    key: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

class App extends Component {
    state = {};

    goTo = url => () => this.props.dispatch(push(url));

    openCredits = () => {
        Modal.info({
            title: 'Crédits',
            content: (
                <div>
                    Icones réalisée par
                    <a href="http://www.freepik.com" title="Freepik"> Freepik </a>
                    de <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a>
                    sous license
                    <a
                        href="http://creativecommons.org/licenses/by/3.0/"
                        title="Creative Commons BY 3.0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CC 3.0 BY
                    </a>.
                </div>
            ),
            onOk() {},
        });
    }

    handleMenu = (e) => {
        if (e.key === 'logout') {
            this.props.dispatch(authLogoutAndRedirect());
        } else {
            const urlMap = {
                admin: '/zw-admin/user',
                dashboard: '/dashboard',
                profile: '/profile/information',
                register: '/register',
                login: '/login',
            };
            this.setState({ selectedMenu: e.key });
            this.props.dispatch(push(urlMap[e.key]));
        }
    };

    render() {
        const { isAuthenticated, isStaff, children } = this.props;
        const { selectedMenu } = this.state;
        const items = [];
        if (isAuthenticated) {
            if (isStaff) {
                items.push(<MenuItem key="admin" icon="tool" name="Admin" />);
            }
            items.push(<MenuItem key="dashboard" icon="dashboard" name="Dashboard" />);
            items.push(<MenuItem key="profile" icon="user" name="Profile" />);
            items.push(<MenuItem key="logout" icon="logout" name="Déconnexion" />);
        } else {
            items.push(<MenuItem key="register" icon="user-add" name="Inscription" />);
            items.push(<MenuItem key="login" icon="login" name="Connexion" />);
        }

        return (
            <Layout className="layout">
                <Header>
                    <Row type="flex" justify="space-between">
                        <Col xs={0} sm={5}>
                            <a onClick={this.goTo('/')}>Enjoy Zero Déchet</a>
                        </Col>
                        <Col sm={18}>
                            <Menu
                                className="main-menu"
                                onClick={this.handleMenu}
                                selectedKeys={[selectedMenu]}
                                theme="dark"
                                mode="horizontal"
                            >
                                {items}
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Layout>{children}</Layout>
                <Footer className="main-footer">
                    <Button.Group>
                        <Button href="https://github.com/blatinier/objectifzero">Github</Button>
                        <Button onClick={this.openCredits}>Crédits</Button>
                    </Button.Group>
                </Footer>
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
