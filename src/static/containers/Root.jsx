import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import routes from '../routes';
import App from '../app';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <App>
            <ConnectedRouter history={history}>
                {routes}
            </ConnectedRouter>
        </App>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
};

export default Root;
