import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { handleError, simpleEvent, simpleEventPayload } from './base';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import * as constants from '../constants';

export function usercardsFetch(token) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.USER_CARDS_FETCH_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/cards/user_cards/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((usercards) => {
                dispatch(simpleEventPayload(constants.USER_CARDS_RECEIVE, { usercards }));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.USER_CARDS_FETCH_FAILURE);
            });
    };
}

export function cardsFetch(token) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.CARDS_FETCH_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/cards/list-add/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((cards) => {
                dispatch(simpleEventPayload(constants.CARDS_RECEIVE, { cards }));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARDS_FETCH_FAILURE);
            });
    };
}

export function createCard(token, values) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.CARD_ADD_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/cards/list-add/`, {
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
                dispatch(simpleEvent(constants.CARD_ADD_SUCCESS));
                dispatch(push('/zw-admin/card'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_ADD_FAILURE);
            });
    };
}

export function editCard(token, slug, values) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.CARD_EDIT_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/cards/card/${slug}/`, {
            method: 'put',
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
                dispatch(simpleEvent(constants.CARD_EDIT_SUCCESS));
                dispatch(push('/zw-admin/card'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_EDIT_FAILURE);
            });
    };
}

export function deleteCard(token, cardSlug) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.CARD_DELETE_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/cards/card/${cardSlug}/`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then((response) => {
                dispatch(simpleEvent(constants.CARD_DELETE_SUCCESS));
                dispatch(cardsFetch(token));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_DELETE_FAILURE);
            });
    };
}

export function cardFetch(token, slug) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.CARD_FETCH_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/cards/card/${slug}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(simpleEventPayload(constants.CARD_RECEIVE, response));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_FETCH_FAILURE);
            });
    };
}
