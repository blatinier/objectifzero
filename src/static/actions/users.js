import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { USER_USERS_FETCH_REQUEST,
    USER_USERS_RECEIVE,
    USER_USERS_FETCH_FAILURE } from '../constants';


export function usersReceive(users) {
    return {
        type: USERS_RECEIVE,
        payload: {
            users
        }
    };
}

export function usersFetchRequest() {
    return {
        type: USERS_FETCH_REQUEST
    };
}

export function usersFetchFailure(error, message) {
    return {
        type: USERS_FETCH_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function usersFetch(token) {
    return (dispatch, state) => {
        dispatch(usercardsFetchRequest());
        return fetch(`${SERVER_URL}/api/v1/users/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(usercardsReceive(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(usercardsFetchFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(usercardsFetchFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}
