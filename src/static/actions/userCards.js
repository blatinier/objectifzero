import { handleError, simpleEvent } from './base';
import { api, parseJSON } from '../utils';
import * as constants from '../constants';

export default function editUserCard(token, id, values, callback = null) {
    return dispatch => api('patch', token, `/user_cards/${id}/`, values)
        .then(parseJSON)
        .then(() => {
            dispatch(simpleEvent(constants.USER_CARD_EDIT_SUCCESS));
            if (callback) {
                callback();
            }
        })
        .catch((error) => {
            handleError(dispatch, error, constants.USER_CARD_EDIT_FAILURE);
        });
}
