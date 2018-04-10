import React, { PropTypes } from 'react';
import {
  Navigator,
	StyleSheet,
	View,
  Image,
	TouchableOpacity,
} from 'react-native';
import { ProfilePhoto } from 'AppComponents';
import { Styles, x } from 'AppStyles';
import {
  Home,
  Search,
  ReviewCreator,
  Wishlist,
  MemberProfileScene,
} from 'AppScenes';
import {
  BasicLayout,
  MyProfileLayout,
} from 'AppLayouts';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: Styles.COLOR_DARKER_30,
    width: x,
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  viewShadow: {
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 68,
    borderRadius: 48,
    shadowColor: Styles.COLOR_NORMAL_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0
    }
  },
  btn: {
    width: 30,
    height: 30,
  },
  plusBtn: {
    width: 70,
    height: 70,
  }
});

export const Footer = ({ navigateTo, user }) => (
	<View style={styles.container}>
    <TouchableOpacity
      onPress={() => navigateTo({
        layout: BasicLayout,
        scene: Home,
        data: { index: 0 }
      })}
    >
      <Image
        style={styles.btn}
        source={require('../../../assets/home_icon@1x.png')}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigateTo({ verb: 'push', scene: Search })}
    >
      <Image
        style={styles.btn}
        source={require('../../../assets/search_icon@1x.png')}
      />
    </TouchableOpacity>
    <View style={styles.viewShadow}>
    <TouchableOpacity
      onPress={() => {
        navigateTo({
          verb: 'push',
          sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
          scene: ReviewCreator,
        });
      }}
    >
      <Image
        style={styles.plusBtn}
        source={require('../../../assets/post_btn@1x.png')}
      />
    </TouchableOpacity>
    </View>
    <TouchableOpacity
      onPress={() => navigateTo({ layout: BasicLayout, scene: Wishlist })}
    >
    <Image
      style={[styles.btn, { width: 34 }]}
      source={require('../../../assets/heart_card_transpa@1x.png')}
    />
		</TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigateTo({
        layout: MyProfileLayout,
        scene: MemberProfileScene,
        user,
        profileType: 'my profile',
        showNavBar: false,
      })}
    >
      <ProfilePhoto type="circle" size={30} border={true} source={user.propic} />
    </TouchableOpacity>
	</View>
);

Footer.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
