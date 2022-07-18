import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { list } from '@lib/api/reply';
import { createAction, handleActions } from 'redux-actions';

const UNLOAD_REPLIES = 'replies/UNLOAD_REPLIES';
const getRepliesActions = createRequestActionTypes('replies/GET_REPLIES');
const [GET_REPLIES, GET_REPLIES_SUCCESS, GET_REPLIES_FAILURE] =
  getRepliesActions;

export const getReplies = createRequestThunk(getRepliesActions, list);
export const unloadReplies = createAction(UNLOAD_REPLIES);

const initialState = {
  loading: false,
  error: false,
  replies: null,
};

const replies = handleActions(
  {
    [UNLOAD_REPLIES]: (state) => initialState,
    [GET_REPLIES]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [GET_REPLIES_SUCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      replies: response.data,
    }),
    [GET_REPLIES_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default replies;
