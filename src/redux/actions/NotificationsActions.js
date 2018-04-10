/**
 * @providesModule ReduxNotificationsActions
 */
import _ from 'lodash';
import { Boutiq } from 'AppServices';
import { createAction } from 'redux-actions';
import { NOTIFS } from '../reducers/notifsFixture';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const UPDATE_NOTIFICATIONS_REQUEST = 'UPDATE_NOTIFICATIONS_REQUEST';
export const UPDATE_NOTIFICATIONS_SUCCESS = 'UPDATE_NOTIFICATIONS_SUCCESS';
export const UPDATE_NOTIFICATIONS_FAIL = 'UPDATE_NOTIFICATIONS_FAIL';

// const queryParams = { tags: '' };

const updateNotificationsRequest = (updateType, notif) => ({
  type: UPDATE_NOTIFICATIONS_REQUEST,
  updateType,
  payload: { ...notif, isFetching: true }
});
export const updateNotificationsSuccess = (payload) => ({
  type: UPDATE_NOTIFICATIONS_SUCCESS,
  payload: Object.assign({}, payload, { isFetching: false })
});
export const updateNotificationsFail = (payload) => ({
  type: UPDATE_NOTIFICATIONS_FAIL,
  payload: Object.assign({}, payload, { isFetching: false })
});
export const updateNotifications = (updateType, notif) =>
(dispatch) => dispatch(updateNotificationsRequest(updateType, notif));

const fetchNotificationsRequest = (name, params = { page: 1 }) => ({
  type: FETCH_REQUEST,
  name,
  params,
  payload: { isFetching: true }
});

export const fetchNotificationsSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload: Object.assign({}, payload, { isFetching: false })
});

export const fetchNotificationsError = (payload) => (
  {
    type: FETCH_ERROR,
    payload: Object.assign({}, payload, { isFetching: false })
  }
);

export const fetchNotifications = (name, params) => (dispatch) =>
dispatch(fetchNotificationsRequest(name, params));
