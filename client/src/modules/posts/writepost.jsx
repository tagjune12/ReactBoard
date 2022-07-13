import { createAction, handleActions } from 'redux-actions';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';
import { write, update } from '@lib/api/post';

const INITIALIZE = 'writepost/INITIALIZE';

const CHANGE_FIELD = 'writepost/CHANGE_FIELD';

const writeActions = createRequestActionTypes('writepost/WRITE_POST');
const [WRITE_POST, WRITE_POST_SUCCCESS, WRITE_POST_FAILURE] = writeActions;

const updateActions = createRequestActionTypes('writepost/UPDATE_POST');
const [UPDATE_POST, UPDATE_POST_SUCCCESS, UPDATE_POST_FAILURE] = updateActions;

export const initialize = createAction(
  INITIALIZE,
  (originalPost) => originalPost,
);
export const changeField = createAction(CHANGE_FIELD, (key, value) => ({
  key,
  value,
}));
export const writeNewPost = createRequestThunk(writeActions, write);
export const updatePost = createRequestThunk(updateActions, update);

const initialState = {
  loading: false,
  error: false,
  category: 'post',
  title: '',
  content: '',
  post: null,
};

const writePost = handleActions(
  {
    [INITIALIZE]: (state, { payload: originalPost }) => ({
      ...initialState,
      ...originalPost,
    }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    [WRITE_POST]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [WRITE_POST_SUCCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      post: response.data,
    }),
    [WRITE_POST_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),

    [UPDATE_POST]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [UPDATE_POST_SUCCCESS]: (state, { payload: response }) => ({
      ...state,
      loading: false,
      error: false,
      post: response.data,
    }),
    [UPDATE_POST_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default writePost;
