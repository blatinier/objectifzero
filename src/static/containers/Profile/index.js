import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import PropTypes from 'prop-types';
import Switch from '../Switch';
import './style.scss';

class Profile extends React.Component {
    updateProfile = key => (val) => {
        this.props.updateProfile(key, val);
    }

    render = () => {
        const { fetchProfile } = this.props;
        if (fetchProfile.pending) {
            return (
                <div className="profile-side-block col-lg-3">
                    <p className="text-center">Loading profile...</p>;
                </div>
            );
        } else if (fetchProfile.fulfilled) {
            const {
                pseudo, email, gender, home_owner,
                has_garden, do_smoke,
            } = fetchProfile.value;
            return (
                <div className="profile-side-block col-lg-3">
                    <div className="col-lg-12">
                        <b>{pseudo}</b>
                        <div className="row">
                            <div className="col-lg-12 email">{email}</div>
                            <div className="col-lg-12 gender">Sexe : {gender}</div>
                            <div className="col-lg-7 home_owner">Je suis propriétaire :</div>
                            <Switch className="col-lg-5"
                                isOn={home_owner}
                                action={this.updateProfile('home_owner')}
                            />
                            <div className="col-lg-7 has_garden">J&#39;ai un jardin :</div>
                            <Switch className="col-lg-5"
                                isOn={has_garden}
                                action={this.updateProfile('has_garden')}
                            />
                            <div className="col-lg-7 do_smoke">Je suis fumeur :</div>
                            <Switch className="col-lg-5"
                                isOn={do_smoke}
                                action={this.updateProfile('do_smoke')}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Profile.propTypes = {
    token: PropTypes.string.isRequired,
};

export default connect(({ token }) => ({
    fetchProfile: {
        url: `/api/v1/accounts/profile/`,
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
    updateProfile: (field, value) => ({
        fetchProfile: {
            url: `/api/v1/accounts/profile/`,
            method: 'POST',
            body: JSON.stringify({ [field]: value }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        },
    })
}))(Profile);
