/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import cardsReducer from '../../../src/static/reducers/cards';
import * as TYPES from '../../../src/static/constants';

describe('Cards Reducers Tests', () => {
    it('should handle USER_CARDS_RECEIVE', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.USER_CARDS_RECEIVE,
            payload: {
                usercards: [
                    { title: 'card 1' },
                    { title: 'card 2' }
                ]
            }
        });
        expect(reducerResponse).to.eql({
            cards: [
                { title: 'card 1' },
                { title: 'card 2' }
            ],
            isFetchingCards: false
        });
    });

    it('should handle USER_CARDS_FETCH_REQUEST', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.USER_CARDS_FETCH_REQUEST
        });
        expect(reducerResponse).to.eql({
            isFetchingCards: true
        });
    });

    it('should handle CARDS_RECEIVE', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARDS_RECEIVE,
            payload: {
                cards: [
                    { title: 'card 1' },
                    { title: 'card 2' }
                ]
            }
        });
        expect(reducerResponse).to.eql({
            cards: [
                { title: 'card 1' },
                { title: 'card 2' }
            ],
            isFetchingCards: false
        });
    });

    it('should handle CARDS_FETCH_REQUEST', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARDS_FETCH_REQUEST
        });
        expect(reducerResponse).to.eql({
            isFetchingCards: true
        });
    });

    it('should handle CARD_ADD_REQUEST', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARD_ADD_REQUEST
        });
        expect(reducerResponse).to.eql({
            isCreatingCard: true
        });
    });

    it('should handle CARD_ADD_FAILURE', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARD_ADD_FAILURE
        });
        expect(reducerResponse).to.eql({
            isCreatingCard: false
        });
    });
    it('should handle CARD_ADD_SUCCRESS', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARD_ADD_SUCCESS
        });
        expect(reducerResponse).to.eql({
            isCreatingCard: false
        });
    });

    it('should handle CARD_DELETE_REQUEST', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARD_DELETE_REQUEST
        });
        expect(reducerResponse).to.eql({
            isDeletingCard: true
        });
    });

    it('should handle CARD_DELETE_FAILURE', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARD_DELETE_FAILURE
        });
        expect(reducerResponse).to.eql({
            isDeletingCard: false
        });
    });
    it('should handle CARD_DELETE_SUCCRESS', () => {
        const reducerResponse = cardsReducer([], {
            type: TYPES.CARD_DELETE_SUCCESS
        });
        expect(reducerResponse).to.eql({
            isDeletingCard: false
        });
    });
});
