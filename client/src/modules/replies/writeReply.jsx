import { createAction, handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { write, update } from '@lib/api/reply';

const INITIALIZE = 'writereply/INITIALIZE';
const CHANGE_FIELD = 'writereply/CHANGE_FIELD';

const writeActions = createRequestActionTypes('writereply/WRITE_REPLY');
const [WRITE_REPLY, WRITE_REPLY_SUCCCESS, WRITE_REPLY_FAILURE] = writeActions;

const updateActions = createRequestActionTypes('writereply/UPDATE_REPLY');
const [UPDATE_REPLY, UPDATE_REPLY_SUCCCESS, UPDATE_REPLY_FAILURE] =
  updateActions;

export const initialize = createAction(
  INITIALIZE,
  (originalComment) => originalComment,
);
export const changeReplyField = createAction(
  CHANGE_FIELD,
  (content) => content,
);

export const writeNewReply = createRequestThunk(writeActions, write);
export const updateReply = createRequestThunk(updateActions, update);

const initialState = {
  loading: false,
  error: false,
  content: '',
  replyId: '',
  reply: null,
};

const writeReply = handleActions(
  {
    [INITIALIZE]: (state, { payload: originalReply }) => ({
      ...initialState,
      ...originalReply,
    }),
    [CHANGE_FIELD]: (state, { payload: content }) => ({
      ...state,
      content,
    }),

    [WRITE_REPLY]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [WRITE_REPLY_SUCCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      reply: response.data,
    }),
    [WRITE_REPLY_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),

    [UPDATE_REPLY]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [UPDATE_REPLY_SUCCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      reply: response.data,
    }),
    [UPDATE_REPLY_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default writeReply;
