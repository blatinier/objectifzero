import { push } from 'react-router-redux';

import { handleError, simpleEvent, simpleEventPayload } from './base';
import { api, parseJSON } from '../utils';
import * as constants from '../constants';

export function createCard(token, values) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.CARD_ADD_REQUEST));
        return api('post', token, '/cards/list-add/', values)
            .then(parseJSON)
            .then(() => {
                dispatch(simpleEvent(constants.CARD_ADD_SUCCESS));
                dispatch(push('/zw-admin/card'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_ADD_FAILURE);
            });
    };
}

export function editCard(token, slug, values) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.CARD_EDIT_REQUEST));
        return api('put', token, `/cards/card/${slug}/`, values)
            .then(parseJSON)
            .then(() => {
                dispatch(simpleEvent(constants.CARD_EDIT_SUCCESS));
                dispatch(push('/zw-admin/card'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_EDIT_FAILURE);
            });
    };
}

export function deleteCard(token, slug) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.CARD_DELETE_REQUEST));
        return api('delete', token, `/cards/card/${slug}/`)
            .then(() => {
                dispatch(simpleEvent(constants.CARD_DELETE_SUCCESS));
                dispatch(push('/zw-admin/card'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_DELETE_FAILURE);
            });
    };
}

export function cardFetch(token, slug) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.CARD_FETCH_REQUEST));
        return api('get', token, `/cards/card/${slug}/`)
            .then(parseJSON)
            .then((response) => {
                dispatch(simpleEventPayload(constants.CARD_RECEIVE, response));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.CARD_FETCH_FAILURE);
            });
    };
}
