import { combineReducers } from 'redux';
import post from '@modules/post';
import user from '@modules/user';

const rootReducer = combineReducers({ post, user });

export default rootReducer;
