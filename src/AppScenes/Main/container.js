import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotifications } from 'ReduxNotificationsActions';
import { getCurrentUser } from 'ReduxUserActions';
import { createSelector } from 'reselect';

const notificationsSelector = createSelector(state => state.notifications,
  ({ isFetching: isNotificationFetching, ...notifications }) => ({
    notifications,
    isNotificationFetching
  })
);

const combinedSelector = createSelector(
  notificationsSelector,
  (notifications) => ({ notifications })
);

const mapStateToProps = (state) => (combinedSelector(state));
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchNotifications, getCurrentUser }, dispatch);

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
