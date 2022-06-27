import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_SUCCESS';

// 액션 생성
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFail = createAction(LOGIN_FAIL);

// 초기 상태

const initialState = {
  user: null,
};

const user = handleActions(
  {
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      user: { ...action.payload },
    }),
    // [LOGIN_FAIL]: (state, action) => initialState,
  },
  initialState,
);

export default user;
