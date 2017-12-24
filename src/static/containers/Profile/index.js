import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Switch from '../Switch';
import './style.scss';

import * as actionCreators from '../../actions/profile';

class ProfileView extends React.Component {
    componentWillMount() {
        const token = this.props.token;
        this.props.actions.profileFetch(token);
    }

    updateField = (field, value) => {
        const token = this.props.token;
        this.props.actions.profileUpdateField(token, field, value);
    }

    updateCustomField = field => (val) => {
        this.updateField(field, val);
    };

    render = () => {
        const { profile, isFetching } = this.props;
        return (
            <div className="profile-side-block col-lg-3">
                {isFetching ?
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
                                action={this.updateCustomField('home_owner')}
                            />
                            <div className="col-lg-7">J&#39;ai un jardin :</div>
                            <Switch className="col-lg-5"
                                isOn={profile.has_garden}
                                action={this.updateCustomField('has_garden')}
                            />
                            <div className="col-lg-7">Je suis fumeur :</div>
                            <Switch className="col-lg-5"
                                isOn={profile.do_smoke}
                                action={this.updateCustomField('do_smoke')}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

ProfileView.propTypes = {
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

ProfileView.defaultProps = {
    profile: {},
    isFetching: true
};

const mapStateToProps = (state) => {
    let profile = {};
    if (state.profile) {
        profile = state.profile.profile;
    }
    return {
        token: state.auth.token,
        profile,
        isFetching: state.profile.isFetchingProfile,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
export { ProfileView as ProfileViewNotConnected };
