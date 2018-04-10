import {
  StyleSheet,
} from 'react-native';
import { Styles } from 'AppStyles';

export const styles = StyleSheet.create({
  wrappingImage: {
    padding: 10,
    flex: 1,
    width: Styles.DEVICE_WIDTH,
    height: Styles.DEVICE_HEIGHT,
  },
  inputText: {
    height: 40,
    width: Styles.DEVICE_WIDTH - 80,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    color: Styles.COLOR_DARKER_45
  },
  textIntro: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 10,
  },
  wrapper: {
    flex: 1,
  },
  form: {
    marginTop: Styles.DEVICE_HEIGHT / 2 - 230,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  buttonSkip: {
    backgroundColor: 'transparent',
    padding: 30,
  },
  buttonSkipText: {
    color: '#FFF',
    textAlign: 'right',
  },
  buttonSubmit: {
    backgroundColor: Styles.COLOR_PINK,
    padding: 10,
    alignSelf: 'flex-end',
  },
  buttonSubmitText: {
    color: '#FFF',
  }
});
