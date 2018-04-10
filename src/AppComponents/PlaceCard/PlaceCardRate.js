import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  wrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  icon: {
    fontSize: Styles.FONT_SIZE_SMALL,
    marginTop: 3,
    marginLeft: 2,
    color: Styles.COLOR_YELLOW,
  },
});

export const PlaceCardRate = ({ rate }) => (
  <View style={styles.wrapper}>
    {_.times(rate, (idx) => (
      <Icon name="star" key={idx} style={styles.icon} />
    ))}
    {_.times(5 - rate, (idx) => (
      <Icon name="star-o" key={idx} style={styles.icon} />
    ))}
  </View>
);

PlaceCardRate.defaultProps = {
  rate: 0
};

PlaceCardRate.propTypes = {
  rate: PropTypes.number.isRequired,
};
