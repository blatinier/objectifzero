import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

class AdminMenu extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    goToUserAdmin = () => {
        this.props.dispatch(push('/zw-admin/user'));
    };

    goToCardAdmin = () => {
        this.props.dispatch(push('/zw-admin/card'));
    };

    render() {
        return (
            <div className="col-lg-3">
                <ul>
                    <li>
                        <a onClick={this.goToUserAdmin}>
                            Users
                        </a>
                    </li>
                    <li>
                        <a onClick={this.goToCardAdmin}>
                            Cards
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(mapDispatchToProps)(AdminMenu);
