import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

export default function requireStaff(Component) {
    class AuthenticatedStaffComponent extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool.isRequired,
            isStaff: PropTypes.bool.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired
            }).isRequired,
            dispatch: PropTypes.func.isRequired
        };

        componentWillMount() {
            this.checkAuthAndStaff();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuthAndStaff();
        }

        checkAuthAndStaff() {
            if (!this.props.isAuthenticated && !this.props.isStaff) {
                const redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true && this.props.isStaff
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            isStaff: state.auth.isStaff,
            token: state.auth.token
        };
    };

    return connect(mapStateToProps)(AuthenticatedStaffComponent);
}
