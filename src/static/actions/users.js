import { push } from 'react-router-redux';

import { handleError, simpleEvent, simpleEventPayload } from './base';
import { api, parseJSON } from '../utils';
import * as constants from '../constants';

export function userFetch(token, username) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.USER_FETCH_REQUEST));
        return api('get', token, `/accounts/user/${username}/`)
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
    return dispatch => api('post', token, '/accounts/list-add/', values)
        .then(parseJSON)
        .then(() => {
            dispatch(simpleEvent(constants.USER_ADD_SUCCESS));
            dispatch(push('/zw-admin/user'));
        })
        .catch((error) => {
            handleError(dispatch, error, constants.USER_ADD_FAILURE);
        });
}

export function editUser(token, username, values) {
    return dispatch => api('patch', token, `/accounts/user/${username}/`, values)
        .then(parseJSON)
        .then(() => {
            dispatch(simpleEvent(constants.USER_EDIT_SUCCESS));
            dispatch(push('/zw-admin/user'));
        })
        .catch((error) => {
            handleError(dispatch, error, constants.USER_EDIT_FAILURE);
        });
}

export function deleteUser(token, username) {
    return dispatch => api('delete', token, `/accounts/user/${username}/`)
        .then(() => {
            dispatch(simpleEvent(constants.USER_DELETE_SUCCESS));
            dispatch(push('/zw-admin/user'));
        })
        .catch((error) => {
            handleError(dispatch, error, constants.USER_DELETE_FAILURE);
        });
}
