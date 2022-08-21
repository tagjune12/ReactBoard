import { createAction, handleActions } from 'redux-actions';
import { requestLogin, requestLogout, check } from '@lib/api/auth';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

// 액션 타입
const loginActions = createRequestActionTypes('user/LOGIN');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = loginActions;

const logoutActions = createRequestActionTypes('user/LOGOUT');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = logoutActions;

const loggedInCheckActions = createRequestActionTypes('user/CHECK_LOGIN');
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = loggedInCheckActions;

const SET_TEMP_USER = 'user/SET_TEMP_USER';

// dispatch
export const userLogin = createRequestThunk(loginActions, requestLogin);
export const userLogout = createRequestThunk(logoutActions, requestLogout);

export const setTempUser = createAction(SET_TEMP_USER, (user) => user);
export const checkLoggedIn = createRequestThunk(loggedInCheckActions, check);

// 초기 상태
const initialState = {
  error: false,
  user: null,
};

const user = handleActions(
  {
    [SET_TEMP_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [LOGIN]: (state) => ({
      ...state,
      error: false,
    }),
    [LOGIN_SUCCESS]: (state, { payload: { data: user } }) => {
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        error: false,
        user,
      };
    },
    [LOGIN_FAILURE]: (state) => ({
      ...state,
      error: true,
    }),
    [LOGOUT]: (state) => ({
      ...state,
    }),
    [LOGOUT_SUCCESS]: (state) => {
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        error: false,
      };
    },
    [LOGOUT_FAILURE]: (state) => ({
      ...state,
      error: true,
    }),
    [CHECK]: (state) => ({
      ...state,
      error: true,
    }),
    [CHECK_SUCCESS]: (state) => ({
      ...state,
      error: false,
    }),
    [CHECK_FAILURE]: (state) => ({
      ...state,
      error: true,
    }),
  },
  initialState,
);

export default user;
