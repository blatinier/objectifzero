import fetch from 'isomorphic-fetch';

const { SERVER_URL } = process.env;

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}

export function api(method, token, endpoint, body = null) {
    return fetch(`${SERVER_URL}/api/v1${endpoint}`, {
        method,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
    }).then(checkHttpStatus);
}
