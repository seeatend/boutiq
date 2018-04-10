import { Boutiq } from 'AppServices';
import { fetchNotificationsSuccess, fetchNotificationsError } from 'ReduxNotificationsActions';

const actionCreators = { fetchNotificationsSuccess, fetchNotificationsError };

export const paginatedFetchMiddleware = store => next => action => {
  if (action.type !== 'FETCH_REQUEST') {
    return next(action);
  }
  const { name, params } = action;
  return Boutiq[`get${name}`](params)
  .then(payload => {
    const { total_entries: totalEntries, per_page: perPage, current_page: currentPage } = payload;
    const totalPageNumber = Math.ceil(totalEntries / perPage);
    const endReached = currentPage === totalPageNumber;
    if (currentPage > 1 && currentPage <= totalPageNumber) {
      const concatEntries = store.getState().notifications.entries.concat(payload.entries);
      const combinedPayload = { ...payload, endReached, entries: concatEntries };
      return next(actionCreators[`fetch${name}Success`](combinedPayload));
    }
    return next(actionCreators[`fetch${name}Success`]({ ...payload, endReached }));
  })
  .catch(message => next(actionCreators[`fetch${name}Error`](message)));
};
