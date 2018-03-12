import * as constants from '../constants';

const initialState = {
    user: null,
    isCreatingUser: false,
    isEditingUser: false,
    isDeletingUser: false,
    isFetchingUser: false,
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case constants.USER_ADD_REQUEST:
            return {
                ...state,
                isCreatingUser: true,
            };

        case constants.USER_ADD_FAILURE:
        case constants.USER_ADD_SUCCESS:
            return {
                ...state,
                isCreatingUser: false,
            };

        case constants.USER_DELETE_REQUEST:
            return {
                ...state,
                isDeletingUser: true,
            };

        case constants.USER_DELETE_FAILURE:
        case constants.USER_DELETE_SUCCESS:
            return {
                ...state,
                isDeletingUser: false,
            };

        case constants.USER_EDIT_REQUEST:
            return {
                ...state,
                isEditingUser: true,
            };

        case constants.USER_EDIT_FAILURE:
        case constants.USER_EDIT_SUCCESS:
            return {
                ...state,
                isEditingUser: false,
            };

        case constants.USER_RECEIVE:
            return {
                ...state,
                user: action.payload,
                isFetchingUser: false,
            };

        case constants.USER_FETCH_REQUEST:
            return {
                ...state,
                user: null,
                isFetchingUser: true,
            };

        default:
            return state;
    }
}
