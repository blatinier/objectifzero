import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { authLogoutAndRedirect } from '../actions/auth';

const withRedirectOnLogout = (WrappedComponent, extraData) => (
    class extends Component {
        componentWillReceiveProps(nextProps) {
            const funcFetch = nextProps[extraData.refetchFunc];
            if (funcFetch.rejected && funcFetch.meta.response.status === 401) {
                nextProps.dispatch(authLogoutAndRedirect());
            }
        }

        render = () => (<WrappedComponent {...this.props} />);
    }
);

withRedirectOnLogout.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default withRedirectOnLogout;
