import { createAction, handleActions } from 'redux-actions';
import { requestLogin, requestLogout } from '@lib/api/auth';
import { createRequestActionTypes } from '@lib/createRequestThunk';

// 액션 타입
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('user/LOGIN');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] =
  createRequestActionTypes('user/LOGOUT');

// 액션 생성

// 로그인
const login = createAction(LOGIN);
const loginSuccess = createAction(LOGIN_SUCCESS, (loginInfo) => loginInfo);
const loginFail = createAction(LOGIN_FAILURE);

// 로그아웃
const logout = createAction(LOGOUT);
const logoutSuccess = createAction(LOGOUT_SUCCESS);
const logoutFail = createAction(LOGOUT_FAILURE);

// dispatch
export const userLogin =
  ({ userId, password }) =>
  async (dispatch) => {
    dispatch(login());
    try {
      const { data } = await requestLogin({ userId, password });
      dispatch(loginSuccess(data));
    } catch (e) {
      dispatch(loginFail());
      throw e;
    }
  };

export const userLogout = (user) => async (dispatch) => {
  dispatch(logout());
  try {
    await requestLogout(user);
    dispatch(logoutSuccess());
  } catch (e) {
    dispatch(logoutFail());
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
    [LOGIN]: (state) => ({
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
    [LOGOUT]: (state) => ({
      ...state,
      loading: true,
    }),
    [LOGOUT_SUCCESS]: (state) => ({
      ...state,
      user: null,
      loading: false,
      error: false,
    }),
    [LOGOUT_FAILURE]: (state) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
  initialState,
);

export default user;
