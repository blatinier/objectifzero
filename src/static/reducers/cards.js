import {
    USER_CARDS_RECEIVE,
    USER_CARDS_FETCH_REQUEST
} from '../constants';

const initialState = {
    cards: null,
    isFetchingCards: false
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
        default:
            return state;
    }
}

