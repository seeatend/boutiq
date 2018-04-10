import React, { PropTypes } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Styles.COLOR_GREEN,
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  icon: {
    fontSize: 20,
    color: Styles.COLOR_WHITE
  },
});

export const NavBarClose = ({ navigator, iconName = 'close', onClose }) => {
  let image;
  if (iconName === 'close') {
    image = <Image style={styles.image} source={require('../../../assets/cross_white.png')} />;
  } else {
    image = <Icon name={iconName} style={styles.icon} />;
  }
  return (
    <TouchableOpacity
      onPress={onClose ? onClose : () => navigator.pop()}
      style={styles.button}
    >
      {image}
    </TouchableOpacity>
  );
};

NavBarClose.propTypes = {
  navigator: PropTypes.object,
  iconName: PropTypes.string,
  onClose: PropTypes.func,
};
