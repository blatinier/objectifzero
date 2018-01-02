/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as TYPES from '../../../src/static/constants';
import * as ACTIONS_USERS from '../../../src/static/actions/users';

import { SERVER_URL } from '../../../src/static/utils/config';


describe('Users Actions:', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    beforeEach(() => {
    });

    it('usersReceive should create USERS_RECEIVE action', () => {
        expect(ACTIONS_USERS.usersReceive({ pseudo: 'pipo' })).to.eql({
            type: TYPES.USERS_RECEIVE,
            payload: {
                pseudo: 'pipo'
            }
        });
    });

    it('usersFetchRequest should create USERS_FETCH_REQUEST action', () => {
        expect(ACTIONS_USERS.usersFetchRequest()).to.eql({
            type: TYPES.USERS_FETCH_REQUEST,
        });
    });

    it('usersFetchFailure should create USERS_FETCH_FAILURE action', () => {
        expect(ACTIONS_USERS.usersFetchFailure(500, 'Error message')).to.eql({
            type: TYPES.USERS_FETCH_FAILURE,
            payload: {
                status: 500,
                statusText: 'Error message'
            }
        });
    });

    it('usersFetch should create USERS_FETCH_REQUEST and USERS_RECEIVE actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.USERS_FETCH_REQUEST
            }, {
                type: TYPES.USERS_RECEIVE,
                payload: {
                    pseudo: 'pipo'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/accounts/list/')
            .reply(200, {
                pseudo: 'pipo'
            });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_USERS.usersFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('usersFetch should create USERS_FETCH_REQUEST and USERS_FETCH_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.USERS_FETCH_REQUEST
            }, {
                type: TYPES.USERS_FETCH_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/accounts/list/')
            .reply(500, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_USERS.usersFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('usersFetch should create USERS_FETCH_REQUEST and USERS_FETCH_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.USERS_FETCH_REQUEST
            }, {
                type: TYPES.USERS_FETCH_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/accounts/list/')
            .reply(400, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_USERS.usersFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });
});
