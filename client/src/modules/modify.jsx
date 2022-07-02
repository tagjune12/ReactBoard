import { createAction, handleActions } from 'redux-actions';
import { editPost } from '@lib/api/post';

// 액션타입
const INITALIZE_POST = 'modify/INITALIZE_POST';
const CHANGE_FIELD = 'modify/MODIFY_POST';
const MODIFY_POST_FAILURE = 'modify/MODIFY_POST_FAILURE';

// 액션 생성
const initializePost = createAction(INITALIZE_POST, (postId, originalPost) => ({
  id: postId,
  post: { ...originalPost },
}));

const changeField = createAction(CHANGE_FIELD, (newPost) => ({
  category: newPost.category,
  title: newPost.title,
  content: newPost.content,
}));
const modifyPostFailure = createAction(MODIFY_POST_FAILURE);

// dispatch
export const modifyPost = (postId, content) => async (dispatch) => {
  dispatch(initializePost(postId, content));
  try {
    const { data } = await editPost(postId, content);
    dispatch(changeField(data));
  } catch (e) {
    dispatch(modifyPostFailure());
    throw e;
  }
};
// 초기상태
const initialState = {
  id: null,
  post: null,
  loading: false,
};

// reducer
const modify = handleActions(
  {
    [INITALIZE_POST]: (state, { payload: originalPost }) => ({
      ...state,
      id: originalPost.id,
      post: { ...originalPost.post },
      loading: true,
    }),
    [CHANGE_FIELD]: (state, { payload: newPost }) => ({
      ...state,
      post: { ...newPost },
      loading: false,
    }),
    [MODIFY_POST_FAILURE]: (state) => ({
      ...initialState,
      loading: false,
    }),
  },
  initialState,
);

export default modify;
