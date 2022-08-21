import { createAction, handleActions } from 'redux-actions';
import { getPostList } from '@lib/api/post';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

// 액션
const loadPostsActions = createRequestActionTypes('postlist/LOAD_POSTS');
const [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE] = loadPostsActions;
const CHANGE_PAGE_NUMBER = 'postlist/CHANGE_PAGE_NUMBER';
const CHANGE_CATEGORY = 'postlist/CHANGE_CATEGORY';

export const getPosts = createRequestThunk(loadPostsActions, getPostList);
export const changePageNumber = createAction(
  CHANGE_PAGE_NUMBER,
  (pageNumber) => pageNumber,
);
export const changeCategory = createAction(
  CHANGE_CATEGORY,
  (category) => category,
);

// 초기 상태
const initialState = {
  error: false,
  posts: null,
  lastPage: 1,
  curPage: 1,
  category: 'all',
};

// 리듀서
const postlist = handleActions(
  {
    [LOAD_POSTS]: (state) => ({
      ...state,
    }),
    [LOAD_POSTS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      posts: response.data,
      lastPage: parseInt(response.headers['last-page']),
    }),
    [LOAD_POSTS_FAILURE]: (state) => ({
      ...state,
      error: true,
    }),
    [CHANGE_PAGE_NUMBER]: (state, { payload: curPage }) => ({
      ...state,
      curPage,
    }),
    [CHANGE_CATEGORY]: (state, { payload: category }) => ({
      ...state,
      category,
    }),
  },
  initialState,
);

export default postlist;
