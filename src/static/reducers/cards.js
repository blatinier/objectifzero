import {
    USER_CARDS_RECEIVE,
    CARDS_RECEIVE,
    USER_CARDS_FETCH_REQUEST,
    CARDS_FETCH_REQUEST,
    CARD_RECEIVE,
    CARD_FETCH_REQUEST,
    CARD_DELETE_FAILURE,
    CARD_DELETE_SUCCESS,
    CARD_DELETE_REQUEST,
    CARD_EDIT_FAILURE,
    CARD_EDIT_SUCCESS,
    CARD_EDIT_REQUEST,
    CARD_ADD_FAILURE,
    CARD_ADD_SUCCESS,
    CARD_ADD_REQUEST
} from '../constants';

const initialState = {
    cards: null,
    current_card: null,
    isFetchingCards: false,
    isCreatingCard: false,
    isEditingCard: false,
    isFetchingCard: false,
    isDeletingCard: false
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

        case CARD_DELETE_REQUEST:
            return Object.assign({}, state, {
                isDeletingCard: true
            });

        case CARD_DELETE_FAILURE:
            return Object.assign({}, state, {
                isDeletingCard: false
            });

        case CARD_DELETE_SUCCESS:
            return Object.assign({}, state, {
                isDeletingCard: false
            });

        case CARD_EDIT_REQUEST:
            return Object.assign({}, state, {
                isEditingCard: true
            });

        case CARD_EDIT_FAILURE:
            return Object.assign({}, state, {
                isEditingCard: false
            });

        case CARD_EDIT_SUCCESS:
            return Object.assign({}, state, {
                isEditingCard: false
            });

        case CARD_RECEIVE:
            return Object.assign({}, state, {
                current_card: action.payload,
                isFetchingCard: false
            });

        case CARD_FETCH_REQUEST:
            return Object.assign({}, state, {
                current_card: null,
                isFetchingCard: true
            });

        default:
            return state;
    }
}
