/**
 * @providesModule ReduxReducers
 */

import { combineReducers } from 'redux';
import { notifications } from './notificationsReducer';
import { user } from './userReducer';

export default combineReducers({
  notifications,
  user
});
