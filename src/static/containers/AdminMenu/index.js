import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Col } from 'antd';

class AdminMenu extends React.Component {
    goTo = url => () => {
        this.props.dispatch(push(url));
    };

    render = () => (
        <Col lg={6}>
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
        </Col>
    );
}

AdminMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(mapDispatchToProps)(AdminMenu);
