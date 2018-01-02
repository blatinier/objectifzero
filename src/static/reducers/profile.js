import {
    PROFILE_RECEIVE,
    PROFILE_FETCH_REQUEST
} from '../constants';

const initialState = {
    profile: {},
    isFetchingProfile: false
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case PROFILE_RECEIVE:
            return Object.assign({}, state, {
                profile: action.payload.data,
                isFetchingProfile: false
            });

        case PROFILE_FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetchingProfile: true
            });
        default:
            return state;
    }
}

