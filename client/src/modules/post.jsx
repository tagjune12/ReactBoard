import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const VIEW_POST = 'post/VIEW_POST';

// 액션 생성
export const viewPost = createAction(VIEW_POST, (post) => post);

// InitialState
const initialState = {
  currentPost: {
    like: 0,
    category: null,
    title: null,
    content: null,
    comments: [],
    author: null,
    publishedDate: null,
  },
};

// Reducer
const post = handleActions(
  {
    [VIEW_POST]: (state, action) => ({
      ...state,
      currentPost: { ...action.payload },
    }),
  },
  initialState,
);

export default post;
