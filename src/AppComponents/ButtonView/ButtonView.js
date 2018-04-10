import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Image } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const ButtonView = ({ styleContainer, iconInfo, imageInfo, callback, disabled }) => (
  <View style={[styles.container, styleContainer]} >
    <TouchableOpacity
      disabled={disabled}
      onPress={callback}
      style={styles.touchable}
    >
    {
      iconInfo
      ? <Icon name={iconInfo.name} size={25} color={iconInfo.color} />
      : <Image source={require(imageInfo.source)} style={imageInfo.style} />
    }
    </TouchableOpacity>
  </View>
);

ButtonView.propTypes = {
  styleContainer: PropTypes.any,
  callback: PropTypes.func.isRequired,
  iconInfo: PropTypes.object,
  imageInfo: PropTypes.object,
};
