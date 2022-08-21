import { createAction } from 'redux-actions';
import { startLoading, finishLoading } from '@modules/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
};

const createRequestThunk = (types, request) => {
  const [TYPE, TYPE_SUCCESS, TYPE_FAILURE] = types;

  const start = createAction(TYPE);
  const success = createAction(TYPE_SUCCESS, (payload) => payload);
  const fail = createAction(TYPE_FAILURE);

  return (params) => async (dispatch) => {
    dispatch(startLoading(TYPE));
    dispatch(start());
    try {
      const response = Array.isArray(params)
        ? await request(...params)
        : await request(params);
      dispatch(success(response));
    } catch (error) {
      dispatch(fail(error));
      throw error;
    }
    dispatch(finishLoading(TYPE));
  };
};

export default createRequestThunk;
