import { StyleSheet } from 'react-native';
import { Styles } from 'AppStyles';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 0.9,
    backgroundColor: Styles.COLOR_WHITE,
    marginBottom: 10
  },
  icon: {
    fontSize: 20,
    color: Styles.COLOR_WHITE
  },
  profileWrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    height: 200,
  },
  proleft: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareButton: {
    backgroundColor: Styles.COLOR_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    width: 95,
    height: 25,
    marginTop: 15,
  },
  proRight: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  ViewFollowButton: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonFollow: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 19,
    width: 100,
    borderWidth: 1,
    borderColor: Styles.COLOR_PINK,
  },
  buttonFollowing: {
    backgroundColor: Styles.COLOR_PINK,
    justifyContent: 'center',
    alignItems: 'center',
    height: 19,
    width: 100,
    borderWidth: 1,
    borderColor: Styles.COLOR_PINK,
  },
  textButtonFollow: {
    color: Styles.COLOR_PINK,
    fontSize: Styles.FONT_SIZE_SMALLER,
  },
  textButtonFollowing: {
    color: Styles.COLOR_WHITE,
    fontSize: Styles.FONT_SIZE_SMALLER,
  },
  wrapperProStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  switch: {
    marginTop: 10,
    width: 55,
    height: 35,
  },
  proRightTextName: {
    color: Styles.COLOR_DARKER_60,
    fontSize: 20,
    fontWeight: 'bold',
  },
  proRightTextLocation: {
    color: Styles.COLOR_DARKER_30,
    fontSize: 14,
  },
  proRightTextProfileType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: Styles.COLOR_DARKER_45,
  },
  proRightTextProfileTypeInfo: {
    color: Styles.COLOR_DARKER_45,
    fontSize: 10,
    textAlign: 'justify',
  },
  hLine: {
    height: 23,
    alignSelf: 'center',
    width: 1,
    backgroundColor: Styles.COLOR_DARKER_15
  },
  profileFollowers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 10,
  },
});
