import { combineReducers } from 'redux';

import UserReducer from './reducer';

export default combineReducers({
    user: UserReducer,
})