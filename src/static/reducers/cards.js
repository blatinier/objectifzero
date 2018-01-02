import {
    USER_CARDS_RECEIVE,
    CARDS_RECEIVE,
    USER_CARDS_FETCH_REQUEST,
    CARDS_FETCH_REQUEST,
    CARD_ADD_FAILURE,
    CARD_ADD_SUCCESS,
    CARD_ADD_REQUEST
} from '../constants';

const initialState = {
    cards: null,
    isFetchingCards: false,
    isCreatingCard: false
};

export default function cardsReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CARDS_RECEIVE:
            return Object.assign({}, state, {
                cards: action.payload.usercards,
                isFetchingCards: false
            });

        case USER_CARDS_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetchingCards: true
            });
        case CARDS_RECEIVE:
            return Object.assign({}, state, {
                cards: action.payload.cards,
                isFetchingCards: false
            });

        case CARDS_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetchingCards: true
            });

        case CARD_ADD_REQUEST:
            return Object.assign({}, state, {
                isCreatingCard: true
            });

        case CARD_ADD_FAILURE:
            return Object.assign({}, state, {
                isCreatingCard: false
            });

        case CARD_ADD_SUCCESS:
            return Object.assign({}, state, {
                isCreatingCard: false
            });

        default:
            return state;
    }
}
