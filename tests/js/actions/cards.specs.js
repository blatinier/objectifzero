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
            .get('/api/v1/cards/list/')
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
            .get('/api/v1/cards/list/')
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
    // TODO createCard success (1) failure (2)
});