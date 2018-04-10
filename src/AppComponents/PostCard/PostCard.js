import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import { ProfilePhoto, CommentsLikesBlock } from 'AppComponents';
import { MemberProfileScene } from 'AppScenes';
import { PostModel } from 'AppModels';
import { Styles } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    marginBottom: Styles.GUTTER,
    backgroundColor: Styles.COLOR_WHITE,
  },
  profileName: {
    marginLeft: 15,
    color: Styles.FONT_COLOR,
    fontSize: Styles.FONT_SIZE_SMALL,
    fontWeight: 'bold',
  },
  timerText: {
    color: Styles.COLOR_DARKER_30,
    fontSize: Styles.FONT_SIZE_SMALLER_NEW,
    position: 'absolute',
    top: 18,
    right: 10
  }
});

const findTimeFromNow = (createdHours) => (
   moment.duration(moment().diff(createdHours)).humanize()
);

const goToPostUserProfile = (navigateTo, post, currentUser) => {
  navigateTo({
    verb: 'push',
    sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    scene: MemberProfileScene,
    user: post.get('user'),
    profileType: currentUser.name === post.get('user').name ? 'my profile' : 'member'
  });
};

export const PostCard = ({ status, user, updated_at, currentUser, post, navigateTo }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => goToPostUserProfile(navigateTo, post, currentUser)}
      style={{ flexDirection: 'row', padding: 15 }}
    >
      <ProfilePhoto
        source={user.propic}
        type="circle"
        size={40}
        border={false}
      />
      <Text style={styles.profileName}>
        {user.name}
      </Text>
    </TouchableOpacity>
    <Text style={styles.timerText}>
      {findTimeFromNow(updated_at)} ago
    </Text>
    <View style={{ padding: 15 }}>
      <Text style={{ color: Styles.FONT_COLOR, fontSize: Styles.FONT_SIZE, }}>
        {status}
      </Text>
    </View>
    <CommentsLikesBlock currentUser={currentUser} post={post} />
  </View>
);

PostCard.propTypes = {
  post: PropTypes.shape(PostModel.schema),
  navigateTo: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  updated_at: PropTypes.string.isRequired,
};
