import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from 'ReduxUserActions';
import { fetchNotifications } from 'ReduxNotificationsActions';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCurrentUser, fetchNotifications }, dispatch);

export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
