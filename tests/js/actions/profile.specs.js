/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as TYPES from '../../../src/static/constants';
import * as ACTIONS_PROFILE from '../../../src/static/actions/profile';

import { SERVER_URL } from '../../../src/static/utils/config';


describe('Profile Actions:', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    beforeEach(() => {
    });

    it('profileReceive should create PROFILE_RECEIVE action', () => {
        expect(ACTIONS_PROFILE.profileReceive({ do_smoke: false, has_garden: true })).to.eql({
            type: TYPES.PROFILE_RECEIVE,
            payload: {
                data: {
                    has_garden: true,
                    do_smoke: false
                }
            }
        });
    });

    it('profileFetchRequest should create PROFILE_FETCH_REQUEST action', () => {
        expect(ACTIONS_PROFILE.profileFetchRequest()).to.eql({
            type: TYPES.PROFILE_FETCH_REQUEST,
        });
    });

    it('profileFetchFailure should create PROFILE_FETCH_FAILURE action', () => {
        expect(ACTIONS_PROFILE.profileFetchFailure(500, 'Error message')).to.eql({
            type: TYPES.PROFILE_FETCH_FAILURE,
            payload: {
                status: 500,
                statusText: 'Error message'
            }
        });
    });

    it('profileFetch should create PROFILE_FETCH_REQUEST and PROFILE_RECEIVE actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.PROFILE_FETCH_REQUEST
            }, {
                type: TYPES.PROFILE_RECEIVE,
                payload: {
                    data: {
                        has_garden: true,
                        do_smoke: false
                    }
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/accounts/profile/')
            .reply(200, {
                has_garden: true,
                do_smoke: false
            });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_PROFILE.profileFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('profileFetch should create PROFILE_FETCH_REQUEST and '
    + 'PROFILE_FETCH_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.PROFILE_FETCH_REQUEST
            }, {
                type: TYPES.PROFILE_FETCH_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/accounts/profile/')
            .reply(400, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_PROFILE.profileFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('profileFetch should create PROFILE_FETCH_REQUEST and '
    + 'PROFILE_FETCH_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.PROFILE_FETCH_REQUEST
            }, {
                type: TYPES.PROFILE_FETCH_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/accounts/profile/')
            .reply(500, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_PROFILE.profileFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('profileUpdateRequest should create PROFILE_UPDATE_REQUEST action', () => {
        expect(ACTIONS_PROFILE.profileUpdateRequest()).to.eql({
            type: TYPES.PROFILE_UPDATE_REQUEST,
        });
    });

    it('profileUpdateFailure should create PROFILE_UPDATE_FAILURE action', () => {
        expect(ACTIONS_PROFILE.profileUpdateFailure(500, 'Error message')).to.eql({
            type: TYPES.PROFILE_UPDATE_FAILURE,
            payload: {
                status: 500,
                statusText: 'Error message'
            }
        });
    });

    it('profileUpdateField should create PROFILE_UPDATE_REQUEST and '
    + 'PROFILE_UPDATE_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.PROFILE_UPDATE_REQUEST
            }, {
                type: TYPES.PROFILE_UPDATE_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/accounts/profile/')
            .reply(500, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_PROFILE.profileUpdateField('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('profileUpdateField should create PROFILE_UPDATE_REQUEST and '
    + 'PROFILE_UPDATE_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.PROFILE_UPDATE_REQUEST
            }, {
                type: TYPES.PROFILE_UPDATE_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/accounts/profile/')
            .reply(400, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_PROFILE.profileUpdateField('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('profileUpdateField should create PROFILE_UPDATE_REQUEST and '
    + 'PROFILE_RECEIVE actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.PROFILE_UPDATE_REQUEST
            }, {
                type: TYPES.PROFILE_RECEIVE,
                payload: {
                    data: {
                        has_garden: true,
                        do_smoke: false
                    }
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/accounts/profile/')
            .reply(200, {
                has_garden: true,
                do_smoke: false
            });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_PROFILE.profileUpdateField('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });
});
