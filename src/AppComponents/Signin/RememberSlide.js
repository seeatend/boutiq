import React from 'react';
import {
  Image,
  Text,
} from 'react-native';
import { styles } from './styles';

export const RememberSlide = () => (
  <Image
    style={styles.wrappingImage}
    source={require('../../../assets/bg_signup3.png')}
  >
    <Text style={styles.slidesTitle}>
      Remember
    </Text>
    <Text style={styles.slidesLegend}>
      moments too good
    </Text>
    <Text style={styles.slidesLegend}>
      to forget
    </Text>
    <Text style={styles.slidesParagraph}>
      From the moments you’ve treasured, to those that await,
      it’s the best of your past and future places captured in one space.
    </Text>
  </Image>
);
