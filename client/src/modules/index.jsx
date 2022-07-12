import { combineReducers } from 'redux';
import post from '@modules/posts/post';
import postlist from '@modules/posts/postlist';
import writePost from '@modules/posts/writepost';
import user from '@modules/users/user';

const rootReducer = combineReducers({ user, post, postlist, writePost });

export default rootReducer;
