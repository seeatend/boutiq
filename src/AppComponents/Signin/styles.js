import { StyleSheet } from 'react-native';
import { Styles } from 'AppStyles';

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  wrappingImage: {
    padding: 40,
    flex: 1,
    width: Styles.DEVICE_WIDTH,
    height: Styles.DEVICE_HEIGHT,
  },
  slidesTitle: {
    color: Styles.COLOR_GREEN,
    fontSize: 23,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    width: Styles.DEVICE_WIDTH - 80,
    marginBottom: 5,
    marginTop: Styles.DEVICE_HEIGHT / 2 - Styles.DEVICE_HEIGHT / 7,
  },
  slidesLegend: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    width: Styles.DEVICE_WIDTH - 80,
    marginBottom: 5,
  },
  slidesParagraph: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
    width: Styles.DEVICE_WIDTH - 80,
    marginTop: 25,
  },
});
