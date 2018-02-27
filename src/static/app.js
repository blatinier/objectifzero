import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';
import 'antd/dist/antd.css'

class App extends Component {
    static defaultProps = {
        location: undefined,
        isStaff: false
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goTo = url => () => {
        this.props.dispatch(push(url));
    };

    render() {
        const { location, isAuthenticated, isStaff, children } = this.props;
        const dashboardClass = classNames({
            active: location && location.pathname === '/dashboard',
        });
        const adminClass = classNames({
            active: location && location.pathname === '/zw-admin/user',
        });
        const loginClass = classNames({
            active: location && location.pathname === '/login',
        });
        const registerClass = classNames({
            active: location && location.pathname === '/register',
        });

        return (
            <div className="app">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#top-navbar"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand js-go-to-index-button" onClick={this.goTo('/')}>
                                Enjoy Zero Déchet
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="top-navbar">
                            {isAuthenticated ?
                                <ul className="nav navbar-nav navbar-right">
                                    {isStaff ?
                                        <li className={adminClass}>
                                            <a className="js-go-to-protected-button"
                                                onClick={this.goTo('/zw-admin/user')}
                                            >
                                                <i className="fa fa-lock" /> Admin
                                            </a>
                                        </li>
                                        :
                                        null
                                    }
                                    <li className={dashboardClass}>
                                        <a className="js-go-to-protected-button" onClick={this.goTo('/dashboard')}>
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a className="js-logout-button" onClick={this.logout}>
                                            Déconnexion
                                        </a>
                                    </li>
                                </ul>
                                :
                                <ul className="nav navbar-nav navbar-right">
                                    <li className={registerClass}>
                                        <a className="js-register-button" onClick={this.goTo('/register')}>
                                            Inscription
                                        </a>
                                    </li>
                                    <li className={loginClass}>
                                        <a className="js-login-button" onClick={this.goTo('/login')}>
                                            Connexion
                                        </a>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </nav>

                <div>
                    {children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isStaff: PropTypes.bool.isRequired,
    children: PropTypes.shape().isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
};

const mapStateToProps = (state, ownProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isStaff: state.auth.isStaff,
    location: state.routing.location,
});

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
