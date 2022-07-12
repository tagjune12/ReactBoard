import { createAction, handleActions } from 'redux-actions';
import { getPostById } from '@lib/api/post';

// 액션 타입
const READ_POST = 'post/READ_POST';
const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS';
const READ_POST_FAILURE = 'post/READ_POST_FAILURE';

// 액션 생성 함수
const readPost = createAction(READ_POST);
const readPostSuccess = createAction(READ_POST_SUCCESS, (post) => post);
const readPostFailure = createAction(READ_POST_FAILURE);

// dispatch
export const getPost = (id) => async (dispatch) => {
  dispatch(readPost());
  try {
    const response = await getPostById(id);
    dispatch(readPostSuccess(response.data));
  } catch (e) {
    dispatch(readPostFailure(e));
    throw e;
  }
};

// 초기상태
const initialState = {
  loading: false,
  error: false,
  post: null,
};

// reducer
const post = handleActions(
  {
    [READ_POST]: (state) => ({
      ...state,
      loading: true,
    }),
    [READ_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      post: {
        ...action.payload,
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
