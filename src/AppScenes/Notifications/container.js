import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotifications, updateNotifications } from 'ReduxNotificationsActions';
import { updateUser } from 'ReduxUserActions';
import { createSelector } from 'reselect';

const notificationsSelector = createSelector(state => state.notifications,
  ({ ...notifications }) => ({
    notifications,
  })
);
const userSelector = createSelector(state => state.user,
  ({ ...user }) => ({
    user,
  })
);

const areFetchingSelector = createSelector(
  [
    state => state.notifications,
    state => state.user,
  ],
  ({ isFetching: isNotificationsFetching, isFetching: isUserFetching }) => (
    { areFetching: isNotificationsFetching && isUserFetching }
  )
);

const mapStateToProps = (state) => ({
  ...notificationsSelector(state),
  ...userSelector(state),
  ...areFetchingSelector(state)
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchNotifications, updateNotifications, updateUser }, dispatch);

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
