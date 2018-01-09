import fetch from 'isomorphic-fetch';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { handleError, simpleEvent, simpleEventPayload } from './base';
import * as constants from '../constants';

export function profileFetch(token) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.PROFILE_FETCH_REQUEST));
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
                dispatch(simpleEventPayload(constants.PROFILE_RECEIVE, response));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.PROFILE_FETCH_FAILURE);
            });
    };
}

export function profileUpdateField(token, field, value) {
    return (dispatch, state) => {
        dispatch(simpleEvent(constants.PROFILE_UPDATE_REQUEST));
        const body = {};
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
                dispatch(simpleEventPayload(constants.PROFILE_RECEIVE, response));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.PROFILE_UPDATE_FAILURE);
            });
    };
}
