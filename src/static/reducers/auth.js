import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGOUT_USER,
} from '../constants';

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    isStaff: false,
    statusText: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_USER_REQUEST:
            return {
                ...state,
                isAuthenticating: true,
                statusText: null,
            };

        case AUTH_LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                isStaff: action.payload.user.is_staff,
                token: action.payload.token,
                userName: action.payload.user.email,
                statusText: 'You have been successfully logged in.',
            };

        case AUTH_LOGIN_USER_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                isStaff: false,
                token: null,
                userName: null,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`,
            };

        case AUTH_LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                isStaff: false,
                token: null,
                userName: null,
                statusText: 'You have been successfully logged out.',
            };

        default:
            return state;
    }
}
