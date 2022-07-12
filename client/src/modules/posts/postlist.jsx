import { handleActions } from 'redux-actions';
import { getPostList } from '@lib/api/post';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

// 액션
const loadPostsActions = createRequestActionTypes('postlist/LOAD_POSTS');
const [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE] = loadPostsActions;

export const getPosts = createRequestThunk(loadPostsActions, getPostList);

// 초기 상태
const initialState = {
  loading: false,
  posts: null,
  lastPage: 1,
  error: false,
};

// 리듀서
const postlist = handleActions(
  {
    [LOAD_POSTS]: (state) => ({
      ...state,
      loading: true,
    }),
    [LOAD_POSTS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      posts: response.data,
      lastPage: parseInt(response.headers['last-page']),
    }),
    [LOAD_POSTS_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default postlist;
