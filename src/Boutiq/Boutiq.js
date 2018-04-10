import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import codePush from 'react-native-code-push';
import { Main, Signin, Onboarding } from 'AppScenes';
import { Auth, User, tracker } from 'AppServices';
import container from './container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class BoutiqClass extends Component {
  static propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    isUserFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthentified: false,
      // user: null,
    };
    this.userOnboarded = this.userOnboarded.bind(this);
  }

  componentWillMount() {
    const promises = [
      Auth.isSignedIn(),
      AsyncStorage.getItem('onboarding'),
      this.props.getCurrentUser(),
    ];
    Promise.all(promises)
    .then(([isSignedIn, onboarding, { payload }]) => {
      this.setState({
        isLoading: false,
        isAuthentified: isSignedIn,
        isOnboarded: Boolean(onboarding),
        // user: { ...payload },
      });
    });
  }

  userOnboarded() {
    AsyncStorage.setItem('onboarding', 'done');
    this.setState({
      isOnboarded: true,
    });
  }

  render() {
    // const { isUserFetching } = this.props;
    let view;
    if (this.state.isLoading) {
      view = (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
          />
        </View>
      );
    } else if (this.state.isAuthentified) {
      if (!this.state.isOnboarded) {
        tracker.screenView({ page: 'Onboarding' });
        view = (
          <Onboarding
            onSubmit={({ location, email }) => {
              User.save({ location, email });
              this.userOnboarded();
            }}
            onDismiss={this.userOnboarded}
          />
        );
      } else {
        const { id } = this.props.user;
        tracker.setUserId({ id: `${id}` });
        view = (
          <Main
            user={this.props.user}
            onLogout={() => {
              tracker.event({ category: 'auth', action: 'logout' });
              tracker.setUserId({ id: null });
              Auth.signout();
              this.setState({ isAuthentified: false, user: null });
            }}
          />
        );
      }
    } else {
      tracker.screenView({ page: 'Signin' });
      view = (
        <Signin onLogin={user => {
          tracker.event({ category: 'auth', action: 'login' });
          this.setState({ isAuthentified: true });
          // this.setState({ isAuthentified: true, user });
        }}
        />
      );
    }
    return view;
  }
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
// export const Boutiq = container(BoutiqClass);
export const Boutiq = codePush(codePushOptions)(container(BoutiqClass));
