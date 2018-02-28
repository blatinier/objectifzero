/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as TYPES from '../../../src/static/constants';
import * as ACTIONS_CARDS from '../../../src/static/actions/cards';

import { SERVER_URL } from '../../../src/static/utils/config';


describe('Cards Actions:', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    beforeEach(() => {
    });

    it('deleteCard should create CARD_DELETE_REQUEST and CARD_DELETE_SUCCESS actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_DELETE_REQUEST
            }, {
                type: TYPES.CARD_DELETE_SUCCESS
            }, {
                payload: {
                    args: [
                        "/zw-admin/card"
                    ],
                    method: "push",
                },
                type: "@@router/CALL_HISTORY_METHOD",
            },
        ];

        nock(SERVER_URL)
            .delete('/api/v1/cards/card/pipo/')
            .reply(200, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.deleteCard('long_meaningless_string', 'pipo'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('deleteCard should create CARD_DELETE_REQUEST and CARD_DELETE_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_DELETE_REQUEST
            }, {
                type: TYPES.CARD_DELETE_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .delete('/api/v1/cards/card/pipo/')
            .reply(400, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.deleteCard('long_meaningless_string', 'pipo'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('deleteCard should create CARD_DELETE_REQUEST and CARD_DELETE_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_DELETE_REQUEST
            }, {
                type: TYPES.CARD_DELETE_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .delete('/api/v1/cards/card/pipo/')
            .reply(500, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.deleteCard('long_meaningless_string', 'pipo'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('createCard should create CARD_ADD_REQUEST and CARD_ADD_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_ADD_REQUEST
            }, {
                type: TYPES.CARD_ADD_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/cards/list-add/')
            .reply(400, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.createCard('long_meaningless_string', 'pipo'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('createCard should create CARD_ADD_REQUEST and CARD_ADD_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_ADD_REQUEST
            }, {
                type: TYPES.CARD_ADD_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/cards/list-add/')
            .reply(500, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.createCard('long_meaningless_string', 'pipo'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('createCard should create CARD_ADD_REQUEST and CARD_ADD_SUCCESS actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_ADD_REQUEST
            }, {
                type: TYPES.CARD_ADD_SUCCESS,
            }, {
                type: '@@router/CALL_HISTORY_METHOD',
                payload: {
                    method: 'push',
                    args: [
                        '/zw-admin/card'
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .post('/api/v1/cards/list-add/')
            .reply(200, {});

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.createCard('long_meaningless_string', 'pipo'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });
});
