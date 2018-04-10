import React, { PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Styles.COLOR_DARKER_30,
  },
  buttonMapview: {
    width: 120,
    height: 23,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Styles.COLOR_LIGHTER_5
  },
});

export const MapViewButton = ({ handleMapView, isMapView }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.buttonMapview}
    onPress={() => {handleMapView();}}
  >
    <Text style={styles.text}>
      {isMapView ? 'List view' : 'Map view'}
    </Text>
    <Icon name={isMapView ? 'list' : 'map-o'} size={16} />
  </TouchableOpacity>
);

MapViewButton.propTypes = {
  handleMapView: PropTypes.func.isRequired,
  isMapView: PropTypes.bool.isRequired,
};
