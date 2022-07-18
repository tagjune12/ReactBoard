import { createAction, handleActions } from 'redux-actions';
import { getPostById } from '@lib/api/post';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

const readPostActions = createRequestActionTypes('post/READ_POST');
const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = readPostActions;
const UNLOAD_POST = 'post/UNLOAD_POST';

export const getPost = createRequestThunk(readPostActions, getPostById);
export const unloadPost = createAction(UNLOAD_POST);

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
  },
  initialState,
);

export default post;
