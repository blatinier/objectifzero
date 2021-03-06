import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

export default function requireAuthentication(MyComponent) {
    class AuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps() {
            this.checkAuth();
        }

        checkAuth = () => {
            const { isAuthenticated, location, dispatch } = this.props;
            if (!isAuthenticated) {
                const redirectAfterLogin = location.pathname;
                dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render = () => {
            if (this.props.isAuthenticated) {
                return <MyComponent {...this.props} />;
            }
            return null;
        }
    }

    AuthenticatedComponent.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}
