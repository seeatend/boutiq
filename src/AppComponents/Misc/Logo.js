import React, { PropTypes } from 'react';
import { Image } from 'react-native';

export const Logo = ({ style }) => (
  <Image style={style} source={require('../../../assets/Boutiq_logo_white_mid.png')} />
);

Logo.propTypes = {
  style: PropTypes.any,
};
