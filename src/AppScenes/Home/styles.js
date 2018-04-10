import { StyleSheet } from 'react-native';
import { Styles } from 'AppStyles';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Styles.COLOR_WHITE,
  },
  icon: {
    fontSize: 20,
    color: Styles.COLOR_WHITE
  },
  tabs: {
    backgroundColor: Styles.COLOR_GREEN,
  },
  tabsContent: {
    flexDirection: 'column',
    backgroundColor: Styles.COLOR_LIGHTER_3,
    flex: 1,
  },
});
