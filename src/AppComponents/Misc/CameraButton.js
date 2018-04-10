import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Styles.COLOR_NORMAL_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0
    }
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  }
});

export const CameraButton = ({ containerStyle, openCameraPicker }) => (
  <View style={[styles.container, containerStyle]}>
    <TouchableOpacity
      onPress={() => {openCameraPicker();}}
      style={styles.button}
    >
      <Image
        style={styles.image}
        source={require('../../../assets/photo_btn@1x.png')}
      />
    </TouchableOpacity>
  </View>
);

CameraButton.propTypes = {
  containerStyle: PropTypes.object,
  openCameraPicker: PropTypes.func.isRequired
};
