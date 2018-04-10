import React, { PropTypes } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Communications from 'react-native-communications';
import { Styles } from 'AppStyles';
import {
  DiscoverSlide,
  TrustSlide,
  RememberSlide,
  SigninButton,
  Logo,
} from 'AppComponents';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    position: 'absolute',
    width: 270,
    height: 41,
    top: Styles.DEVICE_HEIGHT / 10,
    left: Styles.DEVICE_WIDTH / 2 - 128,
  },
  signinWrapper: {
    position: 'absolute',
    right: 40,
    bottom: 80,
    width: Styles.DEVICE_WIDTH - 80
  },
  viewTerms: {
    flexDirection: 'row',
    position: 'absolute',
    left: 40,
    width: Styles.DEVICE_WIDTH - 80,
    bottom: 55,
  },
  textTerms: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: Styles.COLOR_WHITE,
    // textAlign: 'left',

  },
});

export const Signin = ({ onLogin }) => (
  <View style={styles.wrapper}>
    <StatusBar barStyle="light-content" />
    <Swiper
      dot={
        <View style={{
          backgroundColor: 'rgba(255,255,255,.3)',
          width: 13,
          height: 13,
          borderRadius: 7,
          marginLeft: 7,
          marginRight: 7
        }}
        />
      }
      activeDot={
        <View style={{
          backgroundColor: '#fff',
          width: 13,
          height: 13,
          borderRadius: 7,
          marginLeft: 7,
          marginRight: 7
        }}
        />
      }
      paginationStyle={{
        bottom: 20
      }}
      loop={false}
    >
      <DiscoverSlide />
      <TrustSlide />
      <RememberSlide />
    </Swiper>
    <Logo style={styles.logo} />
    <View style={styles.viewTerms}>
      <Text style={styles.textTerms}>
        As a Boutiq user you agree to the
      </Text>
      <Text
        style={[styles.textTerms,
          { textDecorationLine: 'underline', height: 15, marginLeft: 1 }]}
        onPress={() => {
          Communications.web('https://static1.squarespace.com/static/5832bec0414fb5e9baaf7e4a/t/58d1b7ab9de4bbc2e56a800c/1490139052833/Boutiq_Terms_and_Conditions.pdf');
        }}
      >
        Terms and Conditions
      </Text>
    </View>

    <SigninButton style={styles.signinWrapper} onLogin={onLogin} />
  </View>
);

Signin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
