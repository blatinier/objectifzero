import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PropTypes from 'prop-types';

import routes from '../../routes';
import DevTools from './DevTools';
import App from '../../app';

const Root = ({ store, history }) => (
    <div>
        <Provider store={store}>
            <div>
                <App>
                    <ConnectedRouter history={history}>
                        {routes}
                    </ConnectedRouter>
                </App>
                <DevTools />
            </div>
        </Provider>
    </div>
);

Root.propTypes = {
    store: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
};

export default Root;
