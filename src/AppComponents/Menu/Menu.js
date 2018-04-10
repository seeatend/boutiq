import React, { PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Navigator,
} from 'react-native';

import { ProfilePhoto } from 'AppComponents';
import {
  Home,
  MemberProfileScene,
  Wishlist,
  Search,
  Contact,
  ReviewCreator,
} from 'AppScenes';
import { BasicLayout } from 'AppLayouts';
import { MenuNav } from './MenuNav';
import { styles } from './styles';

export const Menu = ({ navigateTo, user, onLogout, handleShareActionSheet }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity
      onPress={() => navigateTo({
        layout: BasicLayout,
        scene: MemberProfileScene,
        user,
        profileType: 'my profile',
        showNavBar: false,
      })}
    >
      <View style={styles.profileWrapper}>
        <ProfilePhoto source={user.propic} type="circle" size={60} border={false} />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileTextUser}>{user.name}</Text>
          <Text style={styles.profileText}>My Profile</Text>
        </View>
      </View>
    </TouchableOpacity>
    <MenuNav
      onPress={() => navigateTo({ layout: BasicLayout, scene: Home, index: 0 })}
      label="Home"
      source={require('../../../assets/home_icon_green.png')}
    />
    <MenuNav
      onPress={() => navigateTo({ layout: BasicLayout, scene: Home, index: 1 })}
      label="Discover more"
      source={require('../../../assets/Triangle.png')}
    />
    <MenuNav
      onPress={() => navigateTo({ layout: BasicLayout, scene: Wishlist, user })}
      label="Wish List"
      source={require('../../../assets/heart_icon_green.png')}
    />
    <MenuNav
      onPress={() => navigateTo({ verb: 'push', scene: Search })}
      label="Search"
      source={require('../../../assets/search_icon_green.png')}
    />
    <MenuNav
      onPress={() => navigateTo({
        verb: 'push',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        scene: ReviewCreator
      })}
      label="New Recommendation"
      source={require('../../../assets/post_icon_green.png')}
    />
    <MenuNav
      onPress={handleShareActionSheet}
      label="Invite Friends"
      source={require('../../../assets/Invite_icon.png')}
    />
    <MenuNav
      onPress={() => navigateTo({ layout: BasicLayout, scene: Contact })}
      label="Contact us"
      source={require('../../../assets/mail_icon_green.png')}
    />
    <MenuNav
      onPress={() => {
        LoginManager.logOut();
        onLogout();
      }}
      label="Log out"
      source={require('../../../assets/logout_icon_green.png')}
    />
  </View>
);

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  handleShareActionSheet: PropTypes.func.isRequired,
};
