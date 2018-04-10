/**
 * @providesModule ReduxUserActions
 */
import _ from 'lodash';
import { User, Boutiq } from 'AppServices';
import { createAction } from 'redux-actions';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAIL = 'GET_FAIL';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

const updateUserRequest = (payload) => ({
  type: UPDATE_USER_REQUEST,
  payload: { ...payload, isFetching: true }
});
export const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload: Object.assign({}, payload, { isFetching: false })
});
export const updateUserFail = (payload) => ({
  type: UPDATE_USER_FAIL,
  payload: Object.assign({}, payload, { isFetching: false })
});
export const updateUser = (payload) =>
(dispatch) => dispatch(updateUserRequest(payload));

const getCurrentUserRequest = () => ({
  type: GET_REQUEST,
});
const getCurrentUserSuccess = (payload) => ({
  type: GET_SUCCESS,
  payload
});
const getCurrentUserFail = (message) => ({
  type: GET_FAIL,
  message
});

export const getCurrentUser = () => (dispatch) => {
  dispatch(getCurrentUserRequest());
  return User.get()
  .then(currentUser => Boutiq.getProfile(currentUser.id))
  .then(currentUser => dispatch(getCurrentUserSuccess(currentUser)))
  .catch(message => dispatch(getCurrentUserFail(message)));
};
