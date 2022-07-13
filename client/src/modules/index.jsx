import { combineReducers } from 'redux';
import post from '@modules/posts/post';
import postlist from '@modules/posts/postlist';
import writePost from '@modules/posts/writepost';
import user from '@modules/users/user';
import comments from '@modules/comments/comments';
import writeComment from '@modules/comments/writeComment';

const rootReducer = combineReducers({
  user,
  post,
  postlist,
  writePost,
  comments,
  writeComment,
});

export default rootReducer;
