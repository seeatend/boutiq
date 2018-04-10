import _ from 'lodash';
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATIONS_SUCCESS,
  UPDATE_NOTIFICATIONS_FAIL
} from 'ReduxNotificationsActions';
import { helpers } from 'AppServices';
import defaultState from './defaultState';

export const notifications = (state = defaultState.notifications, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_SUCCESS:
      return Object.assign({}, state, payload);
    case FETCH_ERROR:
      return Object.assign({}, state, { isFetching: false });
    case UPDATE_NOTIFICATIONS_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case UPDATE_NOTIFICATIONS_SUCCESS:
    // console.log("PAYLOAD RED", payload, state);
    //   const mapping = state.entries.map(item => {
    //     if (item.id === payload.id) {
    //       item.read = true;
    //       return state;
    //     }
    //     return null;
    //   })
    //   console.log("mapping", ..._.without(mapping, null), state);

      const indexItemRead = _.findIndex(state.entries, item => item.id === payload.id);
      const filtered = state.entries.filter(item => item.id !== payload.id);
      const findItemInState = _.find(state.entries, item => item.id === payload.id);
      const cloneItem = _.clone(findItemInState);
      cloneItem.read = true;
      const newState = helpers.insert(filtered, indexItemRead, cloneItem);

      // const test = Object.assign({}, state, ...newState);
      // console.log("RED new old state", state, "-----", test);
      return Object.assign({}, state, { entries: newState }, { isFetching: false });
      // return state;
      case UPDATE_NOTIFICATIONS_FAIL:
      return Object.assign({}, state, { isFetching: false });
    default:
      return state;
  }
};
