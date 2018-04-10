import { User } from 'AppServices';
import { updateUserSuccess, updateUserFail } from 'ReduxUserActions';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

const actionCreators = { updateUserSuccess, updateUserFail };

export const updateUserMiddleware = store => next => action => {
  if (action.type !== UPDATE_USER_REQUEST) {
    return next(action);
  }
  const { payload } = action;
  return User.save(payload)
  .then(res => next(updateUserSuccess(res)))
  .catch(message => next(updateUserFail(message)));
};
