export function failure(eventType, error, message) {
    return {
        type: eventType,
        payload: {
            status: error,
            statusText: message,
        },
    };
}

export function handleError(dispatch, error, eventType) {
    if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
        // Server side error
        dispatch(failure(eventType, 500, 'A server error occurred while sending your data!'));
    } else {
        // Most likely connection issues
        dispatch(failure(eventType, 'Connection Error', 'An error occurred while sending your data!'));
    }
    return Promise.resolve();
}

export function simpleEvent(evt) {
    return {
        type: evt,
    };
}

export function simpleEventPayload(evt, payload) {
    return {
        type: evt,
        payload,
    };
}
