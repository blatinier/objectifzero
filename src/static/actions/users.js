import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { handleError, simpleEvent, simpleEventPayload } from './base';
import { checkHttpStatus, parseJSON } from '../utils';
import * as constants from '../constants';

export function userFetch(token, username) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.USER_FETCH_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/accounts/user/${username}/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(simpleEventPayload(constants.USER_RECEIVE, response));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.USER_FETCH_FAILURE);
            });
    };
}

export function createUser(token, values) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.USER_ADD_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/accounts/list-add/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(values),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(() => {
                dispatch(simpleEvent(constants.USER_ADD_SUCCESS));
                dispatch(push('/zw-admin/user'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.USER_ADD_FAILURE);
            });
    };
}

export function editUser(token, username, values) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.USER_EDIT_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/accounts/user/${username}/`, {
            method: 'patch',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(values),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(() => {
                dispatch(simpleEvent(constants.USER_EDIT_SUCCESS));
                dispatch(push('/zw-admin/user'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.USER_EDIT_FAILURE);
            });
    };
}

export function deleteUser(token, username) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.USER_DELETE_REQUEST));
        return fetch(`${SERVER_URL}/api/v1/accounts/user/${username}/`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then(checkHttpStatus)
            .then(() => {
                dispatch(simpleEvent(constants.USER_DELETE_SUCCESS));
                dispatch(push('/zw-admin/user'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.USER_DELETE_FAILURE);
            });
    };
}
