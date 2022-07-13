import { createAction, handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { write, update } from '@lib/api/comment';

const INITIALIZE = 'writecomment/INITIALIZE';
const CHANGE_FIELD = 'writecomment/CHANGE_FIELD';

const writeActions = createRequestActionTypes('writecomment/WRITE_COMMENT');
const [WRITE_COMMENT, WRITE_COMMENT_SUCCCESS, WRITE_COMMENT_FAILURE] =
  writeActions;

const updateActions = createRequestActionTypes('writecomment/UPDATE_COMMENT');
const [UPDATE_COMMENT, UPDATE_COMMENT_SUCCCESS, UPDATE_COMMENT_FAILURE] =
  updateActions;

export const initialize = createAction(
  INITIALIZE,
  (originalComment) => originalComment,
);
export const changeCommentField = createAction(
  CHANGE_FIELD,
  (content) => content,
);

export const writeNewComment = createRequestThunk(writeActions, write);
export const updateComment = createRequestThunk(updateActions, update);

const initialState = {
  loading: false,
  error: false,
  content: '',
  comment: null,
};

const writeComment = handleActions(
  {
    [INITIALIZE]: (state, { payload: originalComment }) => ({
      ...initialState,
      ...originalComment,
    }),
    [CHANGE_FIELD]: (state, { payload: content }) => ({
      ...state,
      content,
    }),

    [WRITE_COMMENT]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [WRITE_COMMENT_SUCCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      comment: response.data,
    }),
    [WRITE_COMMENT_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),

    [UPDATE_COMMENT]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [UPDATE_COMMENT_SUCCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      post: response.data,
    }),
    [UPDATE_COMMENT_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default writeComment;
