import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Styles } from 'AppStyles';
import { Auth } from 'AppServices';

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    padding: 10,
    backgroundColor: '#4267b2',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#4267b2',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: (Styles.DEVICE_WIDTH - 180) / 2,
    width: 180,
  },
});

export class SigninButton extends Component {
  static propTypes = {
    style: PropTypes.any,
    onLogin: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.login = this.login.bind(this);
  }
 
  login() {
    if (this.state.isLoading) {
      return;
    }
    // this.setState({ isLoading: true });
    // return LoginManager.logInWithReadPermissions(['email', 'public_profile', 'user_friends'])
    // .then(({ isCancelled, grantedPermissions, declinedPermissions, ...props }) => {
    //   if (isCancelled) {
    //     // todo: show alert we need login
    //     this.setState({ isLoading: false });
    //   } else {
    //     return Auth.signin()
    //     .then(({ payload: profile }) => {
    //       this.props.onLogin(profile);
    //     })
    //     .catch(() => this.setState({ isLoading: false }));
    //   }
    // }, (error) => {
    //   console.log("Error :<", error);
    // });
    
  }

  renderText() {
    let view;
    if (this.state.isLoading) {
      view = (
        <View style={{ flex: 1 }}>
          <ActivityIndicator color="#fff" />
        </View>
      );
    } else {
      view = (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="facebook" style={{
            color: '#FFF',
            fontSize: 20,
            marginRight: 10 }}
          />
          <Text style={{
            textAlign: 'center',
            color: '#FFF',
          }}
          >
            Log in with Facebook
          </Text>
        </View>
      );
    }
    return view;
  }
  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity
        style={[styles.wrapper, style]}
        onPress={this.login}
      >
        {this.renderText()}
      </TouchableOpacity>
    );
  }
}
