import React from 'react';
import {
  Image,
  Text,
} from 'react-native';
import { styles } from './styles';

export const DiscoverSlide = () => (
  <Image
    style={styles.wrappingImage}
    source={require('../../../assets/bg_signup1.jpg')}
  >
    <Text style={styles.slidesTitle}>
      Discover
    </Text>
    <Text style={styles.slidesLegend}>
      places you wish
    </Text>
    <Text style={styles.slidesLegend}>
      you knew about
    </Text>
    <Text style={styles.slidesParagraph}>
      From cool local spots to hidden gems abroad, it’s your surroundings
      like you’ve never seen them before.
    </Text>
  </Image>
);
