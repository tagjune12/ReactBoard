import { createAction, handleActions } from 'redux-actions';
import { login } from '@lib/api/auth';

// 액션 타입
const LOGIN_START = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

// 액션 생성
const loginStart = createAction(LOGIN_START);
const loginSuccess = createAction(LOGIN_SUCCESS, (loginInfo) => loginInfo);
const loginFail = createAction(LOGIN_FAILURE);

// dispatch
export const userlogin =
  ({ userId, password }) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await login({ userId, password });
      dispatch(loginSuccess(data));
    } catch (e) {
      dispatch(loginFail());
      throw e;
    }
  };

// 초기 상태
const initialState = {
  loading: false,
  error: false,
  user: null,
};

const user = handleActions(
  {
    [LOGIN_START]: (state) => ({
      ...state,
      loading: true,
      error: false,
    }),
    [LOGIN_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      loading: false,
      error: false,
      user,
    }),
    [LOGIN_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default user;
