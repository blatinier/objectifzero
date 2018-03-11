import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

export default function requireStaff(MyComponent) {
    class AuthenticatedStaffComponent extends Component {
        componentWillMount() {
            this.checkAuthAndStaff();
        }

        componentWillReceiveProps() {
            this.checkAuthAndStaff();
        }

        checkAuthAndStaff = () => {
            const {
                isAuthenticated, isStaff, location, dispatch,
            } = this.props;
            if (!isAuthenticated && !isStaff) {
                const redirectAfterLogin = location.pathname;
                dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        };

        render = () => {
            const { isAuthenticated, isStaff } = this.props;
            let displayComponent;
            if (isAuthenticated && isStaff) {
                displayComponent = <MyComponent {...this.props} />;
            }
            return (
                <div>
                    {displayComponent}
                </div>
            );
        }
    }

    AuthenticatedStaffComponent.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        isStaff: PropTypes.bool.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated,
        isStaff: state.auth.isStaff,
        token: state.auth.token,
    });

    return connect(mapStateToProps)(AuthenticatedStaffComponent);
}
