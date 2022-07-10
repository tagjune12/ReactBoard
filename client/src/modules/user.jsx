import { handleActions } from 'redux-actions';
import { requestLogin, requestLogout } from '@lib/api/auth';
import createRequestThunk, {
  createRequestActionTypes,
} from '@lib/createRequestThunk';

// 액션 타입
const loginActions = createRequestActionTypes('user/LOGIN');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = loginActions;

const logoutActions = createRequestActionTypes('user/LOGOUT');
const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = logoutActions;

// dispatch
export const userLogin = createRequestThunk(loginActions, requestLogin);
export const userLogout = createRequestThunk(logoutActions, requestLogout);

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
    [LOGIN_SUCCESS]: (state, { payload: { data: user } }) => {
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        loading: false,
        error: false,
        user,
      };
    },
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
