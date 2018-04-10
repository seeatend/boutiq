import { Boutiq } from 'AppServices';
import { updateNotificationsSuccess, updateNotificationsFail } from 'ReduxNotificationsActions';
export const UPDATE_NOTIFICATIONS_REQUEST = 'UPDATE_NOTIFICATIONS_REQUEST';

const actionCreators = { updateNotificationsSuccess, updateNotificationsFail };

export const updateMiddleware = store => next => action => {
  if (action.type !== UPDATE_NOTIFICATIONS_REQUEST) {
    return next(action);
  }
  const { updateType, payload } = action;
  return Boutiq[`update${updateType}`](payload.id)
  .then(res => next(actionCreators[`update${updateType}Success`](res)))
  .catch(message => next(actionCreators[`update${updateType}Error`](message)));
};
