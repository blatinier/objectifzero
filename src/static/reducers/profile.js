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
            return {
                ...state,
                profile: action.payload,
                isFetchingProfile: false
            };

        case PROFILE_FETCH_REQUEST:
            return {
                ...state,
                isFetchingProfile: true
            };
        default:
            return state;
    }
}

