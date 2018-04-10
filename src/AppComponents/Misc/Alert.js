import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { x } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    width: x,
    zIndex: 30,
    height: 70,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const pimperAlert = {
  warning: {
    container: {
      backgroundColor: '#FCF8E3',
      borderColor: '#8A6E3C'
    },
    text: {
      color: '#8A6E3C'
    },
  },
  error: {
    container: {
      backgroundColor: '#F2DEDE',
      borderColor: '#A94442'
    },
    text: {
      color: '#A94442'
    },
  },
  success: {
    container: {
      backgroundColor: '#D9EDF7',
      borderColor: '#31708F'
    },
    text: {
      color: '#31708F'
    },
  },
};

export const Alert = ({ alertMessage, alertType }) => {
  if (alertMessage) {
    return (
      <View style={[styles.container, pimperAlert[alertType].container]}>
        <Text>
          {alertMessage}
        </Text>
      </View>
    );
  }
  return <View />;
};

Alert.propTypes = {
  alertMessage: PropTypes.string,
  alertType: PropTypes.oneOf(['warning', 'error', 'info', 'success']),
};
