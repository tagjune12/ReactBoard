import { createAction, handleActions } from 'redux-actions';
import { getPostById, like } from '@lib/api/post';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

const readPostActions = createRequestActionTypes('post/READ_POST');
const likePostActions = createRequestActionTypes('post/LIKE_POST');
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = readPostActions;
const [LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE] = likePostActions;
const UNLOAD_POST = 'post/UNLOAD_POST';

const UP_COMMENT_COUNT = 'post/UP_COMMENT_COUNT';
const DOWN_COMMENT_COUNT = 'post/DOWN_COMMENT_COUNT';

export const getPost = createRequestThunk(readPostActions, getPostById);
export const likePost = createRequestThunk(likePostActions, like);
export const unloadPost = createAction(UNLOAD_POST);
export const upCommentCount = createAction(UP_COMMENT_COUNT);
export const downCommentCount = createAction(DOWN_COMMENT_COUNT);

// 초기상태
const initialState = {
  loading: false,
  error: false,
  post: null,
};

// reducer
const post = handleActions(
  {
    [UNLOAD_POST]: (state) => initialState,
    [READ_POST]: (state) => ({
      ...state,
      loading: true,
    }),
    [READ_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      post: {
        ...response.data,
      },
    }),
    [READ_POST_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
    [UP_COMMENT_COUNT]: (state) => {
      const { post } = state;
      return {
        ...state,
        post: {
          ...post,
          comments: post.comments + 1,
        },
      };
    },
    [DOWN_COMMENT_COUNT]: (state) => {
      const { post } = state;
      return {
        ...state,
        post: {
          ...post,
          comments: post.comments - 1,
        },
      };
    },
    [LIKE_POST]: (state) => ({
      ...state,
      loading: true,
    }),
    [LIKE_POST_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      post: {
        ...response.data,
      },
    }),
    [LIKE_POST_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default post;
