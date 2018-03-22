import React from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import './Profile.css';

class Profile extends React.Component {
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
        url: '/api/v1/accounts/profile/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
    updateProfile: (field, value) => ({
        fetchProfile: {
            url: '/api/v1/accounts/profile/',
            method: 'POST',
            body: JSON.stringify({ [field]: value }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        },
    }),
}))(Profile);
