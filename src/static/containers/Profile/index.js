import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Switch from '../Switch';
import './style.scss';

import * as actionCreators from '../../actions/profile';

class ProfileView extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
            pseudo: PropTypes.string,
            email: PropTypes.string,
            gender: PropTypes.string,
            has_garden: PropTypes.bool,
            do_smoke: PropTypes.bool,
            home_owner: PropTypes.bool
        }),
        token: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            profileFetch: PropTypes.func.isRequired,
            profileUpdateField: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        profile: {},
        isFetching: true
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.profileFetch(token);
    }

    updateField = (field, value) => {
        const token = this.props.token;
        this.props.actions.profileUpdateField(token, field, value);
    }

    updateHomeOwner = (val) => {
        this.updateField('home_owner', val);
    }

    updateHasGarden = (val) => {
        this.updateField('has_garden', val);
    }

    updateDoSmoke = (val) => {
        this.updateField('do_smoke', val);
    }

    render() {
        const profile = this.props.profile;
        return (
            <div className="profile-side-block col-lg-3">
                {this.props.isFetching === true ?
                    <p className="text-center">Loading profile...</p>
                    :
                    <div className="col-lg-12">
                        <b>{profile.pseudo}</b>
                        <div className="row">
                            <div className="col-lg-12">{profile.email}</div>
                            <div className="col-lg-12">Sexe : {profile.gender}</div>
                            <div className="col-lg-7">Je suis propriétaire :</div>
                            <Switch className="col-lg-5"
                                isOn={profile.home_owner}
                                action={this.updateHomeOwner}
                            />
                            <div className="col-lg-7">J&#39;ai un jardin :</div>
                            <Switch className="col-lg-5"
                                isOn={profile.has_garden}
                                action={this.updateHasGarden}
                            />
                            <div className="col-lg-7">Je suis fumeur :</div>
                            <Switch className="col-lg-5"
                                isOn={profile.do_smoke}
                                action={this.updateDoSmoke}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let prof = {};
    if (state.profile) {
        prof = state.profile.profile;
    }
    return {
        token: state.auth.token,
        profile: prof,
        isFetching: state.profile.isFetchingProfile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
export { ProfileView as ProfileViewNotConnected };
