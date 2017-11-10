import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import profileReducer from './profile';
import cardsReducer from './cards';

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cards: cardsReducer,
    routing: routerReducer
});
