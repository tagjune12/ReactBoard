import { combineReducers } from 'redux';
import post from '@modules/post';
import user from '@modules/user';
import modify from '@modules/modify';

const rootReducer = combineReducers({ post, user, modify });

export default rootReducer;
