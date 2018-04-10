import { StyleSheet } from 'react-native';
import { Styles, x, y } from 'AppStyles';
const messageViewHeight = 180;
export const iconSize = 65;
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignSelf: 'stretch',
    opacity: 0.6,
    backgroundColor: Styles.COLOR_LIGHTER_3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: Styles.COLOR_LIGHTER_3,
  },
  viewContainer: {
    position: 'absolute',
    overflow: 'visible',
    left: 30,
    right: 30,
    top: (y - messageViewHeight) / 2,
    height: messageViewHeight,
    backgroundColor: '#FFF'
  },
  textInput: {
    width: 200,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    height: 45,
    borderWidth: 1,
    borderColor: 'grey'
  },
  messageContainer: {
    flex: 1.2,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonAction: {
    padding: 10,
  },
});
