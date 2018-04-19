import { push } from 'react-router-redux';

import { handleError, simpleEvent } from './base';
import { api } from '../utils';
import * as constants from '../constants';

export function createFriendNotification(token, values) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.NOTIFICATION_FRIEND_ADD_REQUEST));
        return api('post', token, '/notifications/list-add/', values)
            .then(() => {
                dispatch(simpleEvent(constants.NOTIFICATION_FRIEND_ADD_SUCCESS));
                dispatch(push('/profile/friends'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.NOTIFICATION_FRIEND_ADD_FAILURE);
            });
    };
}

export function acceptFriendNotification(token, slug) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.NOTIFICATION_FRIEND_ACCEPT_REQUEST));
        return api('post', token, `/notifications/accept/${slug}/`)
            .then(() => {
                dispatch(simpleEvent(constants.NOTIFICATION_FRIEND_ACCEPT_SUCCESS));
                dispatch(push('/profile/friends'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.NOTIFICATION_FRIEND_ACCEPT_FAILURE);
            });
    };
}

export function rejectFriendNotification(token, slug) {
    return (dispatch) => {
        dispatch(simpleEvent(constants.NOTIFICATION_FRIEND_REJECT_REQUEST));
        return api('post', token, `/notifications/reject/${slug}/`)
            .then(() => {
                dispatch(simpleEvent(constants.NOTIFICATION_FRIEND_REJECT_SUCCESS));
                dispatch(push('/profile/friends'));
            })
            .catch((error) => {
                handleError(dispatch, error, constants.NOTIFICATION_FRIEND_REJECT_FAILURE);
            });
    };
}
