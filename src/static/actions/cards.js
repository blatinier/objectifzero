import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { USER_CARDS_FETCH_REQUEST,
    USER_CARDS_RECEIVE,
    USER_CARDS_FETCH_FAILURE,
    CARDS_FETCH_REQUEST,
    CARDS_RECEIVE,
    CARDS_FETCH_FAILURE,
    CARD_ADD_FAILURE,
    CARD_ADD_REQUEST,
    CARD_ADD_SUCCESS } from '../constants';


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
        return fetch(`${SERVER_URL}/api/v1/cards/user_cards/`, {
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

export function cardsFetchRequest() {
    return {
        type: CARDS_FETCH_REQUEST
    };
}

export function cardsReceive(cards) {
    return {
        type: CARDS_RECEIVE,
        payload: {
            cards
        }
    };
}

export function cardsFetchFailure(error, message) {
    return {
        type: CARDS_FETCH_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function cardsFetch(token) {
    return (dispatch, state) => {
        dispatch(cardsFetchRequest());
        return fetch(`${SERVER_URL}/api/v1/cards/list/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(cardsReceive(response));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(cardsFetchFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(cardsFetchFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}

export function cardAddFailure(error, message) {
    return {
        type: CARD_ADD_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function cardAddRequest() {
    return {
        type: CARD_ADD_REQUEST
    };
}

export function cardAddSuccess() {
    return {
        type: CARD_ADD_SUCCESS
    };
}

export function createCard(token, values) {
    return (dispatch, state) => {
        dispatch(cardAddRequest());
        return fetch(`${SERVER_URL}/api/v1/cards/add/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(values)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(cardAddSuccess());
                dispatch(push('/zw-admin/card'));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(cardAddFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(cardAddFailure('Connection Error', 'An error occurred while sending your data!'));
                }
                return Promise.resolve();
            });
    };
}

export function deleteCard(token, card_slug) {
}
