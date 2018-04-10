import React, { PropTypes } from 'react';
import { Styles } from 'AppStyles';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 10
  },
  image: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  menuItem: {
    fontSize: Styles.FONT_SIZE,
    color: Styles.FONT_COLOR,
    fontWeight: '300',
  }
});

export const MenuNav = ({ onPress, label, source }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ height: 40, marginBottom: 10, alignItems: 'center' }}
  >
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={source}
      />
      <Text style={styles.menuItem}>
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

MenuNav.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  source: PropTypes.any.isRequired
};
