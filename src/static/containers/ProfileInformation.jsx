import React, { Component } from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import withRedirectOnLogout from '../utils/withRedirectOnLogout';

import './ProfileInformation.css';

class Profile extends Component {
    updateProfile = key => (val) => {
        this.props.updateProfile(key, val);
    }

    render = () => {
        const { fetchProfile } = this.props;
        if (fetchProfile.pending) {
            return (
                <div className="profile-side-block">
                    <p className="text-center">Loading profile...</p>;
                </div>
            );
        } else if (fetchProfile.fulfilled) {
            const {
                pseudo, email,
            } = fetchProfile.value;
            return (
                <div className="profile-side-block">
                    <Card>
                        <Card.Meta title={pseudo} description={email} />
                    </Card>
                </div>
            );
        }
        return null;
    }
}

Profile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    fetchProfile: PropTypes.shape().isRequired,
};

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
}))(withRedirectOnLogout(Profile, { refetchFunc: 'fetchProfile' }));
