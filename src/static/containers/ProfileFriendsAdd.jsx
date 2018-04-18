import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Form, Col } from 'antd';

import * as actionCreators from '../actions/notifications';
import { generateForm } from '../utils/generateForm';
import { friendsAddFields } from '../utils/forms/friends';

class ProfileFriendsAdd extends Component {
    validateForm = (e) => {
        e.preventDefault();
        const {
            token,
            form: { validateFields },
            actions: { createFriendNotification },
        } = this.props;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            createFriendNotification(token, values);
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
        const profileFriendsAddForm = generateForm(form, this.validateForm, this.cancelForm,
                                                   friendsAddFields, {}, 'Ajouter ami');
        return (
            <Col span={12} offset={6}>
                {profileFriendsAddForm}
            </Col>
        );
    };
}

ProfileFriendsAdd.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: Propypes.string.isRequired,
    form: PropTypes.shape().isRequired,
    actions: PropTypes.shape({
        createFriendNotification: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedProfileFriendsAdd = connect(mapStateToProps, mapDispatchToProps)(ProfileFriendsAdd);
export default Form.create()(ConnectedProfileFriendsAdd);
