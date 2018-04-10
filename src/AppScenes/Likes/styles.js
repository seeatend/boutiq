import { StyleSheet } from 'react-native';
import { Styles } from 'AppStyles';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Styles.COLOR_WHITE,
  },
  navigation: {
    height: 45,
    marginTop: -15,
    borderColor: Styles.COLOR_DARKER_15,
    borderBottomWidth: 1,
  },
  textHeader: {
    color: Styles.COLOR_DARKER_15,
    fontWeight: '600'
  }
});
