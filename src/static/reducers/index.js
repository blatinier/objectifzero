import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import profileReducer from './profile';
import cardsReducer from './cards';
import usersReducer from './users';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cards: cardsReducer,
    users: usersReducer,
    routing: routerReducer
});
