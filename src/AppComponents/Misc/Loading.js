import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export const Loading = ({ style, loader, children }) => (
  <View style={styles.container}>
    {!loader && <ActivityIndicator color={Styles.COLOR_DARKER_15} size="large" {...style} />}
    {loader && loader()}
    {children}
  </View>
);

Loading.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
  loader: PropTypes.func,
};

Loading.defaultProps = {
  style: {},
};
