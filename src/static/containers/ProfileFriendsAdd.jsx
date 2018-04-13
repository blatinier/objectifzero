import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Form, Col } from 'antd';

import { generateForm } from '../utils/generateForm';
import * as actionCreators from '../actions/users';


class ProfileFriendsAdd extends Component {
    validateForm = (e) => {
        e.preventDefault();
        const {
            token,
            form: { validateFields },
            actions: { addFriends },
        } = this.props;
        validateields((err, values) => {
            if (err) {
                return;
            }
            addFriends(token, values);
        });
    };

    cancelForm = () => {
        const {
            form: { resetFields },
            dispatch,
        } = this.props;
        resetFields();
        dispatch(push('/profile/friends'));
    };

    render = () => {
        const { form } = this.props;
        const profileFriendsAddForm = generateForm(form, this.validateForm, this.cancelForm, {}, 'Ajouter ami');
        return (
            <Col span={12} offset={6}>
                {profileFriendsAddForm}
            </Col>
        );
    };
}

ProfileFriendsAdd.propTypes = {
    form: PropTypes.shape().IsRequired,
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedProfileFriendsAdd = connect(mapStateToProps, mapDispatchToProps)(ProfileFriendsAdd);

export default Form.create()(ConnectedProfileFriendsAdd);
