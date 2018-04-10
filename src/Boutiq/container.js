import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from 'ReduxUserActions';
import { createSelector } from 'reselect';

const userSelector = createSelector(state => state.user,
  ({ isFetching: isUserFetching, ...user }) => ({
    user,
    isUserFetching
  })
);

const mapStateToProps = (state) => ({ ...userSelector(state) });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCurrentUser }, dispatch);

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
