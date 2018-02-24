import * as constants from '../constants';

const initialState = {
    current_card: null,
    isCreatingCard: false,
    isEditingCard: false,
    isFetchingCard: false,
    isDeletingCard: false
};

export default function cardsReducer(state = initialState, action) {
    switch (action.type) {
        case constants.CARD_ADD_REQUEST:
            return {
                ...state,
                isCreatingCard: true
            };

        case constants.CARD_ADD_FAILURE:
        case constants.CARD_ADD_SUCCESS:
            return {
                ...state,
                isCreatingCard: false
            };

        case constants.CARD_DELETE_REQUEST:
            return {
                ...state,
                isDeletingCard: true
            };

        case constants.CARD_DELETE_FAILURE:
        case constants.CARD_DELETE_SUCCESS:
            return {
                ...state,
                isDeletingCard: false
            };

        case constants.CARD_EDIT_REQUEST:
            return {
                ...state,
                isEditingCard: true
            };

        case constants.CARD_EDIT_FAILURE:
        case constants.CARD_EDIT_SUCCESS:
            return {
                ...state,
                isEditingCard: false
            };

        case constants.CARD_RECEIVE:
            return {
                ...state,
                current_card: action.payload,
                isFetchingCard: false
            };

        case constants.CARD_FETCH_REQUEST:
            return {
                ...state,
                current_card: null,
                isFetchingCard: true
            };

        default:
            return state;
    }
}
