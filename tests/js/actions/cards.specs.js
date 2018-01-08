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

    it('usercardsReceive should create USER_CARDS_RECEIVE action', () => {
        expect(ACTIONS_CARDS.usercardsReceive([{ title: 'card1' }, { title: 'card2' }])).to.eql({
            type: TYPES.USER_CARDS_RECEIVE,
            payload: {
                usercards: [
                    { title: 'card1' },
                    { title: 'card2' }
                ]
            }
        });
    });

    it('usercardsFetchRequest should create USER_CARDS_FETCH_REQUEST action', () => {
        expect(ACTIONS_CARDS.usercardsFetchRequest()).to.eql({
            type: TYPES.USER_CARDS_FETCH_REQUEST,
        });
    });

    it('usercardsFetchFailure should create USER_CARDS_FETCH_FAILURE action', () => {
        expect(ACTIONS_CARDS.usercardsFetchFailure('error', 'msg')).to.eql({
            type: TYPES.USER_CARDS_FETCH_FAILURE,
            payload: {
                status: 'error',
                statusText: 'msg'
            }
        });
    });

    it('cardsFetchRequest should create CARDS_FETCH_REQUEST action', () => {
        expect(ACTIONS_CARDS.cardsFetchRequest()).to.eql({
            type: TYPES.CARDS_FETCH_REQUEST,
        });
    });

    it('cardsReceive should create CARDS_RECEIVE action', () => {
        expect(ACTIONS_CARDS.cardsReceive([{ title: 'card-title' }])).to.eql({
            type: TYPES.CARDS_RECEIVE,
            payload: {
                cards: [
                    {
                        title: 'card-title'
                    }
                ]
            }
        });
    });

    it('cardsFetchFailure should create CARDS_FETCH_FAILURE action', () => {
        expect(ACTIONS_CARDS.cardsFetchFailure('error', 'msg')).to.eql({
            type: TYPES.CARDS_FETCH_FAILURE,
            payload: {
                status: 'error',
                statusText: 'msg'
            }
        });
    });

    it('cardAddRequest should create CARD_ADD_REQUEST action', () => {
        expect(ACTIONS_CARDS.cardAddRequest()).to.eql({
            type: TYPES.CARD_ADD_REQUEST,
        });
    });

    it('cardAddSuccess should create CARD_ADD_SUCCESS action', () => {
        expect(ACTIONS_CARDS.cardAddSuccess()).to.eql({
            type: TYPES.CARD_ADD_SUCCESS,
        });
    });

    it('cardAddFailure should create CARD_ADD_FAILURE action', () => {
        expect(ACTIONS_CARDS.cardAddFailure('error', 'msg')).to.eql({
            type: TYPES.CARD_ADD_FAILURE,
            payload: {
                status: 'error',
                statusText: 'msg'
            }
        });
    });

    it('usercardsFetch should create USER_CARDS_FETCH_REQUEST and '
    + 'USER_CARDS_FETCH_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.USER_CARDS_FETCH_REQUEST
            }, {
                type: TYPES.USER_CARDS_FETCH_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/cards/user_cards/')
            .reply(500, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.usercardsFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('usercardsFetch should create USER_CARDS_FETCH_REQUEST and '
    + 'USER_CARDS_FETCH_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.USER_CARDS_FETCH_REQUEST
            }, {
                type: TYPES.USER_CARDS_FETCH_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/cards/user_cards/')
            .reply(400, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.usercardsFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('usercardsFetch should create USER_CARDS_FETCH_REQUEST and '
    + 'USER_CARDS_RECEIVE actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.USER_CARDS_FETCH_REQUEST
            }, {
                type: TYPES.USER_CARDS_RECEIVE,
                payload: {
                    usercards: [
                        { title: 'card1' },
                        { title: 'card2' }
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/cards/user_cards/')
            .reply(200, [
                { title: 'card1' },
                { title: 'card2' }
            ]);

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.usercardsFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('cardsFetch should create CARDS_FETCH_REQUEST and CARDS_FETCH_FAILURE actions when API returns 500', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARDS_FETCH_REQUEST
            }, {
                type: TYPES.CARDS_FETCH_FAILURE,
                payload: {
                    status: 500,
                    statusText: 'A server error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/cards/list-add/')
            .reply(500, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.cardsFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('cardsFetch should create CARDS_FETCH_REQUEST and CARDS_FETCH_FAILURE actions when API returns 400', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARDS_FETCH_REQUEST
            }, {
                type: TYPES.CARDS_FETCH_FAILURE,
                payload: {
                    status: 'Connection Error',
                    statusText: 'An error occurred while sending your data!'
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/cards/list/')
            .reply(400, { });

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.cardsFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('cardsFetch should create CARDS_FETCH_REQUEST and CARDS_RECEIVE actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARDS_FETCH_REQUEST
            }, {
                type: TYPES.CARDS_RECEIVE,
                payload: {
                    cards: [
                        { title: 'card1' },
                        { title: 'card2' }
                    ]
                }
            }
        ];

        nock(SERVER_URL)
            .get('/api/v1/cards/list-add/')
            .reply(200, [
                { title: 'card1' },
                { title: 'card2' }
            ]);

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});

        store.dispatch(ACTIONS_CARDS.cardsFetch('long_meaningless_string'))
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
            }).then(done).catch(done);
    });

    it('cardDeleteRequest should create CARD_DELETE_REQUEST action', () => {
        expect(ACTIONS_CARDS.cardDeleteRequest()).to.eql({
            type: TYPES.CARD_DELETE_REQUEST,
        });
    });

    it('cardDeleteSuccess should create CARD_DELETE_SUCCESS action', () => {
        expect(ACTIONS_CARDS.cardDeleteSuccess()).to.eql({
            type: TYPES.CARD_DELETE_SUCCESS,
        });
    });

    it('cardDeleteFailure should create CARD_DELETE_FAILURE action', () => {
        expect(ACTIONS_CARDS.cardDeleteFailure('error', 'msg')).to.eql({
            type: TYPES.CARD_DELETE_FAILURE,
            payload: {
                status: 'error',
                statusText: 'msg'
            }
        });
    });

    it('deleteCard should create CARD_DELETE_REQUEST and CARD_DELETE_SUCCESS actions when API returns 200', (done) => {
        const expectedActions = [
            {
                type: TYPES.CARD_DELETE_REQUEST
            }, {
                type: TYPES.CARD_DELETE_SUCCESS
            }, {
                type: TYPES.CARDS_FETCH_REQUEST
            }
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
