import { combineReducers } from 'redux';
import post from '@modules/post';
import user from '@modules/user';
import modify from '@modules/modify';
import postlist from '@modules/postlist';

const rootReducer = combineReducers({ post, user, modify, postlist });

export default rootReducer;
