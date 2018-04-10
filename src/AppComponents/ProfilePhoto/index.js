import React, { PropTypes } from 'react';
import {
	View,
	Image,
} from 'react-native';

import { Styles } from 'AppStyles';

export const ProfilePhoto = ({ type, size, border, source, borderColor }) => {
  const borderRadius = (type === 'circle') ? (size / 2) : 0;
  const borderBorder = (border) ? 2 : 0;
  const sourceImage = source ?
  {
    uri: source
  }
  : require('../../../assets/profilePlaceholderImage.png');
  return (
    <View style={{ justifyContent: 'center' }}>
      <Image
        source={sourceImage}
        style={{
          height: size,
          width: size,
          borderRadius,
          borderColor,
          borderWidth: borderBorder,
        }}
      />
    </View>
  );
};

ProfilePhoto.defaultProps = {
  source: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkuPzumWqefoTBlfHeUwJX9VeYJyhGbR6DYt4WYApJcJTvFlPv',
  borderColor: Styles.COLOR_DARKER_15
};

ProfilePhoto.propTypes = {
  type: PropTypes.string.isRequired,
  source: PropTypes.string,
  size: PropTypes.number.isRequired,
  border: PropTypes.bool.isRequired,
  borderColor: PropTypes.string
};
