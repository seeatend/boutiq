import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Navigator,
} from 'react-native';
import { ProfileSettingsScene } from 'AppScenes';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    marginRight: 5,
    width: 45,
    height: 45,
    alignItems: 'center',
    backgroundColor: Styles.COLOR_GREEN,
  },
  navbarRightImage: {
    padding: 2,
    height: 20,
    width: 20,
    backgroundColor: Styles.COLOR_GREEN
  }
});

const goToNotificationsScene = (navigateTo) => {
  navigateTo({
    verb: 'push',
    sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    scene: ProfileSettingsScene,
  });
};

export const NavBarRight = ({ navigateTo }) => (
  <TouchableOpacity
    onPress={() => goToNotificationsScene(navigateTo)}
    style={styles.button}
  >
    <Image
      source={require('../../../assets/Settings_icon_white.png')}
      style={styles.navbarRightImage}
    />
  </TouchableOpacity>
);

NavBarRight.propTypes = {
  navigateTo: PropTypes.func.isRequired,
};
NavBarRight.defaultProps = {
  navigateTo: () => {},
};
