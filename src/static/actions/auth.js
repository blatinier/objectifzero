import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { checkHttpStatus, parseJSON } from '../utils';
import { failure } from './base';
import * as constants from '../constants';

const { SERVER_URL } = process.env;

export function authLoginUserSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: constants.AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user,
        },
    };
}

export function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: constants.AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message,
        },
    };
}

export function authLoginUserRequest() {
    return {
        type: constants.AUTH_LOGIN_USER_REQUEST,
    };
}

export function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return {
        type: constants.AUTH_LOGOUT_USER,
    };
}

export function authLogoutAndRedirect() {
    return (dispatch) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

export function authLoginUser(email, password, redirect = '/dashboard') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${email}:${password}`);
        return fetch(`${SERVER_URL}/api/v1/users/login/`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${auth}`,
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authLoginUserSuccess(response.token, response.user));
                dispatch(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function authRegisterUser(username, email, password) {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        return fetch(`${SERVER_URL}/api/v1/users/register/`, {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                username,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(() => {
                dispatch(authLoginUser(email, password, '/dashboard'));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status < 500) {
                    dispatch(failure(
                        constants.AUTH_REGISTER_USER_FAILURE,
                        'Erreur de saisie', 'Email invalide ou déjà enregistré.',
                    ));
                }
                return Promise.resolve();
            });
    };
}
