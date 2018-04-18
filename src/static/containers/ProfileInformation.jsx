import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';
import { Spin, Form } from 'antd';

import withRedirectOnLogout from '../utils/withRedirectOnLogout';
import { generateForm } from '../utils/generateForm';
import { profileFields } from '../utils/forms/user';

import './ProfileInformation.css';

class Profile extends Component {
    updateProfile = key => (val) => {
        this.props.updateProfile(key, val);
    }

    validateProfile = (e) => {
        e.preventDefault();
        console.log('### VALIDATE PROFILE');
    };

    render = () => {
        const { fetchProfile, form } = this.props;
        let profileDisplay;
        if (fetchProfile.pending) {
            profileDisplay = (
                <div className="text-center">
                    <Spin size="large" />
                    Récupération du profil...
                </div>
            );
        } else if (fetchProfile.fulfilled) {
            const {
                username, email, has_garden, home_owner, do_smoke, gender,
            } = fetchProfile.value;
            const initialData = {
                username,
                email,
                has_garden,
                home_owner,
                do_smoke,
                gender,
            };
            profileDisplay = generateForm(form, this.validateProfile, null, profileFields, initialData, 'Editer');
        }
        return (
            <div className="profile-side-block">
                {profileDisplay}
            </div>
        );
    }
}

Profile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    fetchProfile: PropTypes.shape().isRequired,
    form: PropTypes.shape().isRequired,
};

const ProfileWithForm = Form.create()(Profile)

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
