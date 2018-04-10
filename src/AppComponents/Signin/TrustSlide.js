import React from 'react';
import {
  Image,
  Text,
} from 'react-native';
import { styles } from './styles';

export const TrustSlide = () => (
  <Image
    style={styles.wrappingImage}
    source={require('../../../assets/bg_signup2.png')}
  >
    <Text style={styles.slidesTitle}>
      Trust
    </Text>
    <Text style={styles.slidesLegend}>
      suggestions from your
    </Text>
    <Text style={styles.slidesLegend}>
      friends and network
    </Text>
    <Text style={styles.slidesParagraph}>
      Not everyone you identify with is around you right now,
      but the places they’ve tried, tested and loved are.
    </Text>
  </Image>
);
