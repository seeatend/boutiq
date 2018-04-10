import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Navigator,
  View,
  Image,
  Text,
  AppState
} from 'react-native';
import { NotificationsScene } from 'AppScenes';
import { Styles } from 'AppStyles';
import container from './container';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginRight: 5,
    width: 45,
    height: 45,
    alignItems: 'center',
    backgroundColor: Styles.COLOR_GREEN,
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  countContainer: {
    zIndex: 10,
    position: 'absolute',
    right: 3,
    top: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 18,
    height: 18,
  }
});

export class _NavBarNotifications extends Component {
  static stateResumeRegex = /inactive|background/
  static propTypes = {
    fetchNotifications: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    unseen: PropTypes.number.isRequired,
    userId: PropTypes.number,
  }
  static defaultProps = {
    navigateTo: () => {},
    unseen: 0,
  }
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }
  componentWillMount() {
    const { fetchNotifications } = this.props;
    fetchNotifications('Notifications', { page: 1 })
    .catch(error => console.error('error', error));
    AppState.addEventListener('change', this.handleAppStateChange);
    this.props.getCurrentUser()
    .catch(error => {
      console.error('Error:', error);
    });
    this.handleRegularFetch();
  }
  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(_NavBarNotifications.stateResumeRegex)) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
    if (this.state.appState.match(_NavBarNotifications.stateResumeRegex)
    && nextAppState === 'active') {
      this.props.fetchNotifications('Notifications', { page: 1 })
      .catch(error => {
        console.error('Error:', error);
      });
      this.handleRegularFetch();
    }
    this.setState({ appState: nextAppState });
  }
  handleRegularFetch() {
    this.intervalId = setInterval(() => {
      this.props.getCurrentUser()
      .catch(error => {
        console.error('Error:', error);
      });
    }, 30000);
  }
  goToNotificationsScene() {
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: NotificationsScene,
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.goToNotificationsScene()}
        style={styles.button}
      >
        {this.props.unseen > 0 && <View style={styles.countContainer}>
          <Text style={{ fontSize: 11, color: 'white' }}>
            {this.props.unseen}
          </Text>
        </View>}
        <Image
          style={styles.image}
          source={require('../../../../assets/lightning_icon_white.png')}
        />
      </TouchableOpacity>
    );
  }
}

export const NavBarNotifications = container(_NavBarNotifications);

NavBarNotifications.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  unseen: PropTypes.number,
};
NavBarNotifications.defaultProps = {
  navigateTo: () => {},
  unseen: 0,
};
