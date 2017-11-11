import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { PROFILE_FETCH_REQUEST,
         PROFILE_RECEIVE,
         PROFILE_FETCH_FAILURE,
         PROFILE_UPDATE_FAILURE,
         PROFILE_UPDATE_REQUEST} from '../constants';


export function profileReceive(data) {
    return {
        type: PROFILE_RECEIVE,
        payload: {
            data
        }
    };
}

export function profileFetchRequest() {
    return {
        type: PROFILE_FETCH_REQUEST
    };
}

export function profileFetchFailure(error, message) {
    return {
        type: PROFILE_FETCH_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function profileFetch(token) {
    return (dispatch, state) => {
        dispatch(profileFetchRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/profile/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(profileReceive(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(profileFetchFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(profileFetchFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}

export function profileUpdateRequest() {
    return {
        type: PROFILE_UPDATE_REQUEST
    };
}

export function profileUpdateFailure(error, message) {
    return {
        type: PROFILE_UPDATE_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function profileUpdateField(token, field, value) {
    return (dispatch, state) => {
        dispatch(profileUpdateRequest());
        var body = {};
        body[field] = value;
        return fetch(`${SERVER_URL}/api/v1/accounts/profile/`, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(profileReceive(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(profileUpdateFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(profileUpdateFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}
