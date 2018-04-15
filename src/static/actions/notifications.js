import { push } from 'react-router-redux';

import { handleError, simpleEvent } from './base';
import { api, parseJSON } from '../utils';
import * as constants from '../constants';

export function createFriendNotification(token, values) {
    return dispatch => {
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
