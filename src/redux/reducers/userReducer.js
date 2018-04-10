import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAIL
} from 'ReduxUserActions';
import defaultState from './defaultState';

export const user = (state = defaultState.user, { type, payload: profile }) => {
  switch (type) {
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, { isFetching: true, ...profile });
    case UPDATE_USER_FAIL:
      return Object.assign({}, state, { isFetching: false });
    case GET_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case GET_SUCCESS:
      return Object.assign({}, state, { isFetching: false, ...profile });
    case GET_FAIL:
      return Object.assign({}, state, { isFetching: false });
    default:
      return state;
  }
};
