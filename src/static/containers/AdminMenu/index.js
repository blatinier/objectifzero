import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

class AdminMenu extends React.Component {
    goTo = url => () => {
        this.props.dispatch(push(url));
    };

    render = () => (
        <div className="col-lg-3">
            <ul>
                <li>
                    <a onClick={this.goTo('/zw-admin/user')}>
                        Users
                    </a>
                </li>
                <li>
                    <a onClick={this.goTo('/zw-admin/card')}>
                        Cards
                    </a>
                </li>
            </ul>
        </div>
    );
}

AdminMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapDispatchToProps)(AdminMenu);
