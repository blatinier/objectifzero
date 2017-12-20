import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import * as actionCreators from '../../actions/users';

class ShortUserView extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            pseudo: PropTypes.string,
            email: PropTypes.string.isRequired,
            gender: PropTypes.string.isRequired,
            has_garden: PropTypes.bool.isRequired,
            do_smoke: PropTypes.bool.isRequired,
            home_owner: PropTypes.bool.isRequired,
            is_staff: PropTypes.bool.isRequired,
        }).isRequired,
    };

    render() {
        const { user } = this.props;
        return (
            <div className="panel panel-default card">
                <div className="panel-body">
                    <div className="col-lg-10">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShortUserView);
export { ShortUserView as ShortUserViewNotConnected };