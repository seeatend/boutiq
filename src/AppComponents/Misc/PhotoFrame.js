import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Styles, x } from 'AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 20,
    width: x,
    height: x
  },
  button: {
    position: 'absolute',
    bottom: x - 50,
    left: x - 50,
    backgroundColor: Styles.COLOR_DARKER_60,
    width: 27,
    height: 27,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 2,
  }
});

export const PhotoFrame = ({ closeFrame, children }) => (
  <View style={styles.container}>
    {children}
    <TouchableOpacity
      style={styles.button}
      onPress={() => {closeFrame();}}
    >
      <Icon style={styles.icon} name="close" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

PhotoFrame.propTypes = {
  closeFrame: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
