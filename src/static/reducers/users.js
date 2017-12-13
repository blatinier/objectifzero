import {
    USERS_RECEIVE,
    USERS_FETCH_REQUEST
} from '../constants';

const initialState = {
    users: null,
    isFetchingUsers: false
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case USERS_RECEIVE:
            return Object.assign({}, state, {
                users: action.payload.users,
                isFetchingUsers: false
            });

        case USERS_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetchingUsers: true
            });
        default:
            return state;
    }
}
