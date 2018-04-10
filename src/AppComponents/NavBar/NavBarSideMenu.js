import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
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
});

export const NavBarSideMenu = ({ openMenu }) => (
  <TouchableOpacity
    onPress={openMenu}
    style={styles.button}
  >
    <Image style={styles.image} source={require('../../../assets/menu_white.png')} />
  </TouchableOpacity>
);

NavBarSideMenu.propTypes = {
  openMenu: PropTypes.func.isRequired,
};
