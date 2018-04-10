import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchNotifications } from 'ReduxNotificationsActions';
import { createSelector } from 'reselect';

const ACTION_CREATOR = { fetchNotifications };

const selector = createSelector((state, type) => state[type],
  ({ isFetching, ...notifications }) => ({
    data: notifications,
    isFetching
  })
);

const mapStateToProps = (state, ownProps) => ({ ...selector(state, ownProps.fetchType.toLowerCase()) });
const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log( "ownProps", ownProps);
  return (
    bindActionCreators({ fetcher: ACTION_CREATOR[`fetch${ownProps.fetchType}`] }, dispatch)
  );};

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
