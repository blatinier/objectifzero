import React from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';
import { Switch, Row, Col } from 'antd';
import './style.css';

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
                pseudo, email, gender, home_owner,
                has_garden, do_smoke,
            } = fetchProfile.value;
            return (
                <div className="profile-side-block">
                    <Col span={24}>
                        <b>{pseudo}</b>
                        <Row>
                            <Col span={24} className="email">{email}</Col>
                        </Row>
                        <Row>
                            <Col span={24} className="gender">Sexe : {gender}</Col>
                        </Row>
                        <Row>
                            <Col span={14} className="home_owner">Je suis propriétaire :</Col>
                            <Switch
                                checked={home_owner}
                                onChange={this.updateProfile('home_owner')}
                            />
                        </Row>
                        <Row>
                            <Col span={14} className="has_garden">J&#39;ai un jardin :</Col>
                            <Switch
                                checked={has_garden}
                                onChange={this.updateProfile('has_garden')}
                            />
                        </Row>
                        <Row>
                            <Col span={14} className="do_smoke">Je suis fumeur :</Col>
                            <Switch
                                checked={do_smoke}
                                onChange={this.updateProfile('do_smoke')}
                            />
                        </Row>
                    </Col>
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
