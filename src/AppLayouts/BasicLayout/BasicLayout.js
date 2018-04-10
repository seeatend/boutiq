import React, { PropTypes } from 'react';
import {
  View,
  Image,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Styles } from 'AppStyles';
import {
  NavBarSideMenu,
  NavBarNotifications,
  Footer,
} from 'AppComponents';

export const BasicLayout = ({ user, openMenu, navigateTo, children }) => (
  <View style={{ flex: 1 }}>
    <NavigationBar
      tintColor={Styles.COLOR_GREEN}
      title={
        <Image
          source={require('../../../assets/boutiq_logo@0.5x.png')}
          style={{
            width: 130,
            height: 25,
            alignSelf: 'center',
            resizeMode: 'contain'
          }}
        />}
      leftButton={<NavBarSideMenu openMenu={openMenu} />}
      rightButton={
        <NavBarNotifications
          navigateTo={navigateTo}
          unseen={user.unseen}
          userId={user.id}
        />
      }
    />
    {children}
    <Footer
      user={user}
      navigateTo={navigateTo}
    />
  </View>
);

BasicLayout.propTypes = {
  children: PropTypes.element.isRequired,
  openMenu: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
