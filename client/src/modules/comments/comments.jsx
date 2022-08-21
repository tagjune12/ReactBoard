import { createAction, handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { getCommentList, like } from '@lib/api/comment';

const getCommentsActions = createRequestActionTypes('comments/GET_COMMENTS');
const likeCommentActions = createRequestActionTypes('post/LIKE_COMMENT');
const [GET_COMMENTS, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE] =
  getCommentsActions;
const [LIKE_COMMENT, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_FAILURE] =
  likeCommentActions;

const UNLOAD_COMMENTS = 'comments/UNLOAD_COMMENTS';
const UP_REPLY_COUNT = 'comments/UP_REPLY_COUNT';
const DOWN_REPLY_COUNT = 'comments/DOWN_REPLY_COUNT';

export const getComments = createRequestThunk(
  getCommentsActions,
  getCommentList,
);
export const likeComment = createRequestThunk(likeCommentActions, like);
export const unloadComments = createAction(UNLOAD_COMMENTS);
export const upReplyCount = createAction(
  UP_REPLY_COUNT,
  (commentId) => commentId,
);
export const downReplyCount = createAction(
  DOWN_REPLY_COUNT,
  (commentId) => commentId,
);

const initialState = {
  error: false,
  comments: null,
};

const comments = handleActions(
  {
    [UNLOAD_COMMENTS]: (state) => initialState,
    [GET_COMMENTS]: (state) => ({
      ...state,
      error: false,
    }),
    [GET_COMMENTS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      error: false,
      comments: response.data,
    }),
    [GET_COMMENTS_FAILURE]: (state) => ({
      ...state,
      error: true,
    }),
    [UP_REPLY_COUNT]: (state, { payload: commentId }) => {
      const { comments } = state;
      comments.forEach((comment) => {
        if (commentId === comment._id) {
          comment.reply += 1;
        }
      });
      return {
        ...state,
        comments,
      };
    },
    [DOWN_REPLY_COUNT]: (state, { payload: commentId }) => {
      const { comments } = state;
      comments.forEach((comment) => {
        if (commentId === comment._id) {
          comment.reply -= 1;
        }
      });
      return {
        ...state,
        comments,
      };
    },
    [LIKE_COMMENT]: (state) => ({
      ...state,
    }),
    [LIKE_COMMENT_SUCCESS]: (state, { payload: response }) => {
      const comments = state.comments;
      const data = response.data;
      comments.forEach((comment, index) => {
        if (comment._id === data._id) {
          comments[index] = {
            ...data,
          };
        }
      });

      return {
        ...state,
        error: false,
        comments,
      };
    },
    [LIKE_COMMENT_FAILURE]: (state) => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default comments;
