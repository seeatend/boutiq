import { StyleSheet } from 'react-native';
import { Styles, x } from 'AppStyles';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Styles.COLOR_WHITE,
  },
  wrapperContent: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    height: 30,
    fontSize: 20
  },
  wrapperMap: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Styles.COLOR_NORMAL_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3
    },
    marginBottom: 25
  },
  map: {
    alignSelf: 'center',
    width: x - 20,
    height: 150,
  },
  placeTextInput: {
    paddingLeft: 5,
    alignSelf: 'center',
    marginBottom: 30,
    width: x - 20,
    height: 35,
    borderColor: Styles.COLOR_NORMAL_GREY,
    borderWidth: 1
  },
  reviewTextInput: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    width: x - 20,
    height: 180,
    borderColor: Styles.COLOR_NORMAL_GREY,
  },
  wrapperSocialMedia: {
    width: x - 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50,
    alignSelf: 'flex-start'
  },
  imageSocial: {
    position: 'absolute',
    bottom: - 22,
    left: (x - 50) / 2.25,
    width: 60,
    height: 60,
  },
  postBtn: {
    padding: 15,
    textAlign: 'center',
    color: Styles.COLOR_WHITE,
    backgroundColor: Styles.COLOR_GREEN,
  },
  reviewLabel: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Styles.COLOR_DARKER_60,
  }
});
