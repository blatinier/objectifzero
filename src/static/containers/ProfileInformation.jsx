import React, { Component, Fragment } from 'react';
import { connect } from 'react-refetch';
import { connect as connectRedux } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spin, Form, Button, Row, Col, Icon, Modal } from 'antd';

import * as actionCreators from '../actions/users';
import { authLogoutAndRedirect } from '../actions/auth';
import withRedirectOnLogout from '../utils/withRedirectOnLogout';
import { generateForm } from '../utils/generateForm';
import { profileFields } from '../utils/forms/user';
import ShortUser from './ShortUser';

import './ProfileInformation.css';

const confirm = Modal.confirm;

class Profile extends Component {
    state = {
        editing: false,
    }

    showConfirm = () => {
        const {
            token,
            actions: { archiveUser }
        } = this.props;
        const title = 'Suppression de compte';
        const content = 'En supprimant votre compte, toutes vos informations personnelles seront effacées et vous serez redirigé vers la page de login';
        confirm({
            title,
            content,
            onOk() {
                return newPromise(() => {
                    archiveUser(token);
                    authLogoutAndRedirect();
                }).catch(() => console.log('An error occured while archiving a user'));
            },
            onCancel() {},
        });
    }

    deleteProfile = (e) => {
    }

    editProfile = () => {
        this.setState({ editing: true });
    };

    updateProfile = key => (val) => {
        this.props.updateProfile(key, val);
    }

    cancelProfile = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({ editing: false });
    }

    validateProfile = (e) => {
        e.preventDefault();
        console.log('### VALIDATE PROFILE');
    };

    renderEditProfile = ({ username, email, has_garden, home_owner, do_smoke, gender }) => {
        const { form } = this.props;
        const initialData = {
            username,
            email,
            has_garden,
            home_owner,
            do_smoke,
            gender,
        };
        return generateForm(form, this.validateProfile, this.cancelProfile, profileFields, initialData, 'Editer');
    };

    renderProfile = (user) => (
        <Row gutter={6} type="flex" justify="space-around" align="middle" className="edit-card">
            <Col span={20} offset={2}>
                <ShortUser
                    admin={false}
                    user={user}
                />
            </Col>
            <Col span={2}>
                <div className="edit" onClick={this.editProfile}>
                    <Icon className="edit-icon" type="edit" />
                </div>
            </Col>
        </Row>
    );

    render = () => {
        const { fetchProfile, form } = this.props;
        const { editing, showDeleteModal } = this.state;
        let profileDisplay;
        if (fetchProfile.pending) {
            profileDisplay = (
                <div className="text-center">
                    <Spin size="large" />
                    Récupération du profil...
                </div>
            );
        } else if (fetchProfile.fulfilled) {
            const user = fetchProfile.value;
            if (editing) {
                profileDisplay = this.renderEditProfile(user);
            } else {
                profileDisplay = this.renderProfile(user);
            }
        }
        const deleteText = "Supprimer compte!"
        return (
            <Fragment>
                <Row>
                    {profileDisplay}
                </Row>
                <Row type="flex" justify="space-around" className="delete-button">
                    <Button type="danger" onClick={this.showConfirm}>
                        {deleteText}
                    </Button>
                </Row>
            </Fragment>
        );
    }
}

Profile.propTypes = {
    token: PropTypes.string.isRequired,
    updateProfile: PropTypes.func.isRequired,
    fetchProfile: PropTypes.shape().isRequired,
    form: PropTypes.shape().isRequired,
    actions: PropTypes.shape({
        archiveUser: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedProfile = connectRedux(mapStateToProps, mapDispatchToProps)(Profile);

const ProfileWithForm = Form.create()(ConnectedProfile)

export default connect(({ token }) => ({
    fetchProfile: {
        url: '/api/v1/users/profile/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
    updateProfile: (field, value) => ({
        fetchProfile: {
            url: '/api/v1/users/profile/',
            method: 'POST',
            body: JSON.stringify({ [field]: value }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        },
    }),
}))(withRedirectOnLogout(ProfileWithForm, { refetchFunc: 'fetchProfile' }));
