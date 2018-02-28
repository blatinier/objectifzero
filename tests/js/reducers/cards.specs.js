/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import cardsReducer from '../../../src/static/reducers/cards';
import * as TYPES from '../../../src/static/constants';

describe('Cards Reducers Tests', () => {
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
