import { createAction, handleActions } from 'redux-actions';
import { getPostById } from '@lib/api/post';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

const readPostActions = createRequestActionTypes('post/READ_POST');
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = readPostActions;
const UNLOAD_POST = 'post/UNLOAD_POST';

const UP_COMMENT_COUNT = 'post/UP_COMMENT_COUNT';
const DOWN_COMMENT_COUNT = 'post/DOWN_COMMENT_COUNT';

export const getPost = createRequestThunk(readPostActions, getPostById);
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
    [READ_POST_SUCCESS]: (state, { payload: reponse }) => ({
      ...state,
      loading: false,
      post: {
        ...reponse.data,
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
  },
  initialState,
);

export default post;
