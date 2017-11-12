import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { USER_CARDS_FETCH_REQUEST,
    USER_CARDS_RECEIVE,
    USER_CARDS_FETCH_FAILURE } from '../constants';


export function usercardsReceive(usercards) {
    return {
        type: USER_CARDS_RECEIVE,
        payload: {
            usercards
        }
    };
}

export function usercardsFetchRequest() {
    return {
        type: USER_CARDS_FETCH_REQUEST
    };
}

export function usercardsFetchFailure(error, message) {
    return {
        type: USER_CARDS_FETCH_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function usercardsFetch(token) {
    return (dispatch, state) => {
        dispatch(usercardsFetchRequest());
        return fetch(`${SERVER_URL}/api/v1/getdata/`, {
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
