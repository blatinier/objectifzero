import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Switch from '../Switch';

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
            profileFetch: PropTypes.func.isRequired
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

    update_field = (field, value) => {
        const token = this.props.token;
        this.props.actions.profileUpdateField(token, field, value);
    }

    update_home_owner = (val) => {
        this.update_field('home_owner', val);
    }

    update_has_garden = (val) => {
        this.update_field('has_garden', val);
    }

    update_do_smoke = (val) => {
        this.update_field('do_smoke', val);
    }

    render() {
        return (
          <div className="col-lg-3">
            {this.props.isFetching === true ?
              <p className="text-center">Loading profile...</p>
            :
              <div>
                <div className="margin-top-small">
                  <div className="alert alert-info">
                    <b>{this.props.profile.pseudo}</b>
                    <ul>
                      <li>{this.props.profile.email}</li>
                      <li>Sexe : {this.props.profile.gender}</li>
                      <li>
                        Je suis propriétaire :
                        <Switch
                            isOn={this.props.profile.home_owner}
                            action={this.update_home_owner}></Switch>
                      </li>
                      <li>
                        J'ai un jardin :
                        <Switch
                            isOn={this.props.profile.has_garden}
                            action={this.update_has_garden}></Switch>
                      </li>
                      <li>
                        Je suis fumeur :
                        <Switch
                            isOn={this.props.profile.do_smoke}
                            action={this.update_do_smoke}></Switch>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            }
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    var prof = {};
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
