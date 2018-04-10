import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { styles, iconSize } from './styles';

export const ButtonView = ({ styleContainer, icon, callback }) => (
  <View style={[styles.container, styleContainer]} >
    <TouchableOpacity
      onPress={callback}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={icon} style={{ width: iconSize, height: iconSize }} />
    </TouchableOpacity>
  </View>
);

ButtonView.propTypes = {
  styleContainer: PropTypes.object,
  icon: PropTypes.any.isRequired,
  callback: PropTypes.func.isRequired
};
