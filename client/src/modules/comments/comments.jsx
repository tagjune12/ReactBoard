import { handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { getCommentList } from '@lib/api/comment';

const getCommentsActions = createRequestActionTypes('comments/GET_COMMENTS');
const [GET_COMMENTS, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE] =
  getCommentsActions;

export const getComments = createRequestThunk(
  getCommentsActions,
  getCommentList,
);

const initialState = {
  loadig: false,
  error: false,
  comments: null,
};

const comments = handleActions(
  {
    [GET_COMMENTS]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [GET_COMMENTS_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      comments: response.data,
    }),
    [GET_COMMENTS_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default comments;
