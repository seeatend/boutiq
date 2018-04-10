import React, { Component, PropTypes } from 'react';
import {
	View,
	Text,
  Switch,
	TouchableOpacity,
  Navigator,
} from 'react-native';
import autobind from 'autobind-decorator';
import {
	ProfilePhoto,
	ProfileFollow,
} from 'AppComponents';
import { Styles } from 'AppStyles';
import { ContactsListScene } from 'AppScenes';
import { User, tracker } from 'AppServices';
import { styles } from './styles';

export class Profile extends Component {
  static propTypes = {
    profileType: PropTypes.string.isRequired,
    navigateTo: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    follow: PropTypes.string.isRequired,
    isMyProfile: PropTypes.bool,
    handleProfileStatus: PropTypes.func,
    handleShareActionSheet: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
      follow: props.follow,
      isPublic: props.user.public,
    };
    this.renderFollowStatus = this.renderFollowStatus.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.setFollow = this.setFollow.bind(this);
    this.setUnFollow = this.setUnFollow.bind(this);
  }

  setFollow(follow) {
    this.setState({ follow });
    User.follow(this.props.user.id)
    .then((res) => {
      // console.log("RES", res);
    })
    .catch(error => console.log("ERrOR??", error));
  }

  setUnFollow(follow) {
    this.setState({ follow });
    User.unfollow(this.props.user.id)
    .then((res) => {
      // console.log("RES", res);
    })
    .catch(error => console.log("ERrOR", error))
  }

  handleStatus() {
    const { isPublic } = this.state;
    User.save({ public: !isPublic });
    this.setState({
      isPublic: !isPublic
    });
  }

  findTotalReview() {
    if (this.state.profile.feed_entries) {
      const { feed_entries } = this.state.profile;
      return feed_entries.filter(el => el.feed_type === 'review').length;
    }
    if (this.state.profile.total_reviews) {
      const { total_reviews: totalReviews } = this.state.profile;
      return totalReviews;
    }
    return null;
  }

  @autobind
  handleProfileStatus(value) {
    tracker.event({ category: 'profileStatus', action: 'change', options: {
      label: 'isPublic',
      value: value ? 1 : 0
    } });
    this.setState({
      profile:
        Object.assign({}, this.state.profile, { public: value })
    }, () => {
      User.save(this.state.profile)
      .catch(error => console.error('error', error));
    });
  }


  renderFollowStatus(followType) {
    const { isFriend, public: isPublic } = this.state.profile;
    let followingStatus;
    if (followType === 'Friend' || followType === 'Following') {
      followingStatus = (
        <TouchableOpacity
          onPress={() => this.setUnFollow('Follow')}
          style={styles.buttonFollowing}
        >
          <Text style={styles.textButtonFollowing}>Following</Text>
        </TouchableOpacity>
      );
    }
    if (followType === 'Follow') {
      followingStatus =
			(
        <TouchableOpacity
          onPress={() => this.setFollow('Following')}
          style={styles.buttonFollow}
        >
          <Text style={styles.textButtonFollow}>Follow</Text>
        </TouchableOpacity>
      );
    }
    if (!isFriend && !isPublic) {
      followingStatus = <View />;
    }
    return followingStatus;
  }

  renderProfileType() {
    const { follow, profile } = this.state;
    const { public: isPublic } = profile;
    if (this.props.isMyProfile) {
      return (
        <View>
          <View style={styles.wrapperProStatus}>
            <Text style={styles.proRightTextProfileType}>
              {isPublic ? 'Public Profile' : 'Private Profile'}
            </Text>
            <Switch
              onTintColor={Styles.COLOR_GREEN}
              style={styles.switch}
              onValueChange={(value) => this.handleProfileStatus(value)}
              value={isPublic}
            />
          </View>
          <Text style={styles.proRightTextProfileTypeInfo}>
            When your profile is public, your reviews are displayed in the
            discover feed and other users can follow you.
            Share the places you love for your friends and followers to discover.
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.ViewFollowButton}>
				{this.renderFollowStatus(follow)}
      </View>
    );
  }

  render() {
    const {
      name,
      location,
      reviews_count,
      user_followers,
      user_followings,
      user_friends,
    } = this.state.profile;
    const { navigateTo } = this.props;
    const imageSourceToRender = this.state.profile.propic;
    return (
      <View style={styles.wrapper}>
        <View style={styles.profileWrapper}>
          <View style={[styles.proleft,
              !this.props.isMyProfile && { justifyContent: 'flex-start', marginTop: 10 }]}
          >
            <ProfilePhoto type="circle" size={90} border={false} source={imageSourceToRender} />
            {
              this.props.isMyProfile &&
              <TouchableOpacity
                style={styles.shareButton}
                onPress={this.props.handleShareActionSheet}
              >
                <Text style={{ color: 'white' }}>
                  Invite friends
                </Text>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.proRight}>
            <Text style={styles.proRightTextName}>
              {name}
            </Text>
            <Text style={styles.proRightTextLocation}>
              {location}
            </Text>
            {this.renderProfileType()}
          </View>
        </View>
        <View style={styles.profileFollowers}>
          <TouchableOpacity
            onPress={() => navigateTo({
              verb: 'push',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              scene: ContactsListScene,
              contactType: 'friends',
              userId: this.state.profile.id,
              navigateTo
            })}
          >
            <ProfileFollow
              label="Friends"
              num={user_friends.length}
              {...this.props}
            />
          </TouchableOpacity>
          <View style={styles.hLine} />
          <TouchableOpacity
            onPress={() => this.props.navigateTo({
              verb: 'push',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              scene: ContactsListScene,
              contactType: 'followers',
              userId: this.state.profile.id
            })}
          >
            <ProfileFollow
              label="Followers"
              num={user_followers.length}
              {...this.props}
            />
          </TouchableOpacity>
          <View style={styles.hLine} />
          <TouchableOpacity
            onPress={() => this.props.navigateTo({
              verb: 'push',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              scene: ContactsListScene,
              contactType: 'followings',
              userId: this.state.profile.id
            })}
          >
            <ProfileFollow
              label="Following"
              num={user_followings.length}
              {...this.props}
            />
          </TouchableOpacity>
          <View style={styles.hLine} />
          <ProfileFollow
            label="Places"
            num={reviews_count}
            {...this.props}
          />
        </View>
      </View>
    );
  }
}
