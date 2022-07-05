import { createAction, handleActions } from 'redux-actions';
import { getPostList } from '@lib/api/post';

// 액션
const LOAD_POSTS = 'postlist/LOAD_POSTS';
const LOAD_POSTS_SUCCESS = 'postlist/LOAD_POSTS_SUCCESS';
const LOAD_POSTS_FAILURE = 'postlist/LOAD_POSTS_FAILURE';

// 액션 생성
const loadPosts = createAction(LOAD_POSTS);
const loadPostsSuccess = createAction(
  LOAD_POSTS_SUCCESS,
  (response) => response,
);
const loadPostsFailure = createAction(LOAD_POSTS_FAILURE);

// dispatch
export const getPosts =
  (page = 1, username, category) =>
  async (dispatch) => {
    dispatch(loadPosts());
    try {
      const response = await getPostList(page, username, category);
      dispatch(loadPostsSuccess(response));
    } catch (e) {
      dispatch(loadPostsFailure());
      throw e;
    }
  };

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
