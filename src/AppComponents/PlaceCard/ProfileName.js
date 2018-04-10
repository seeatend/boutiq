import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';
import { Styles, x } from 'AppStyles';
import { ProfilePhoto } from 'AppComponents';
import { PlaceCardRate } from './PlaceCardRate';
import { UserModel, PlaceModel } from 'AppModels';
import { User, helpers } from 'AppServices';
import moment from 'moment';

const styles = StyleSheet.create({
  wrapper: {
    width: x,
    height: 65,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // wrapperProfileName: {
  //   marginLeft: 10,
  // },
  profileName: {
    color: Styles.FONT_COLOR,
    fontSize: Styles.FONT_SIZE_SMALL,
    fontWeight: 'bold',
  },
  placeName: {
    color: Styles.FONT_COLOR,
    fontSize: Styles.FONT_SIZE_SMALLER,
  },
  local: {
    color: Styles.FONT_COLOR,
    fontSize: Styles.FONT_SIZE_SMALLER,
  },
  buttonFollow: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 19,
    width: 100,
    borderWidth: 1,
    borderColor: Styles.COLOR_PINK,
  },
  following: {
    fontSize: Styles.FONT_SIZE_SMALLER,
    color: Styles.COLOR_PINK,
  },
  postTime: {
    fontSize: Styles.FONT_SIZE_SMALLER,
    color: Styles.FONT_COLOR,
    marginBottom: 5,
  }
});

const findTimeFromNow = (createdHours) => (moment.duration(moment().diff(createdHours)).humanize());

export class ProfileName extends Component {
  constructor(props) {
    super(props);
    this.user = new UserModel(props.user);
    this.state = {
      follow: this.user.getFollowState()
    };
    this.followStatus = this.followStatus.bind(this);
  }

  setFollowStatus(follow) {
    this.setState({ follow });
    User.follow(this.user.get('id'));
  }

  findTimeFromNow(createdHours) {
    return moment.duration(moment().diff(createdHours)).humanize();
  }

  followStatus(followType) {
    const { created_at: createdAt, isMyProfile } = this.props;
    let followingStatus;
    if (isMyProfile || followType === 'Following') {
      followingStatus = <Text style={styles.postTime}>{findTimeFromNow(createdAt)} ago</Text>;
    } else {
      followingStatus =
      (<TouchableOpacity
        onPress={() => this.setFollowStatus('Following')}
        style={styles.buttonFollow}
      >
        <Text style={styles.following}>Follow</Text>
      </TouchableOpacity>);
    }
    return followingStatus;
  }

  render() {
    const { follow } = this.state;
    const { user, place, stars, isProfilePressable } = this.props;
    if (!place) {
      return <View />;
    }
    return (
      <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', width: x, paddingRight: 10 }}>
          {user.propic && <ProfilePhoto
            source={user.propic}
            type="circle" size={40} border={false}
          />}
          {/* <View style={styles.wrapperProfileName}>
            <TouchableOpacity
              disabled={!isProfilePressable}
              onPress={this.props.goToReviewUserProfile}
            >
              <Text style={styles.profileName}>{user.name}</Text>
            </TouchableOpacity>
            {
              place.toJSON().name &&
              <TouchableOpacity onPress={this.props.goToPlaceDetails}>
                <Text style={styles.placeName}>{place.toJSON().name}</Text>
              </TouchableOpacity>
            }
            {
              place.toJSON().local &&
              <TouchableOpacity onPress={this.props.goToPlaceDetails}>
                <Text style={styles.local}>{place.toJSON().local.split(',')[0]}</Text> */}
            <View style={{ alignSelf: 'center', flex: 1.1, marginLeft: 10 }}>
             <View style={{ flex: 0.9, justifyContent: 'center' }}>
               <TouchableOpacity
                 disabled={!isProfilePressable}
                 onPress={this.props.goToReviewUserProfile}
               >
                 <Text style={styles.profileName}>{user.name}</Text>
              </TouchableOpacity>
              </View>
              <View style={{ flex: 1.1, justifyContent: 'flex-start' }}>
                {
                  place.toJSON().name &&
                  <TouchableOpacity onPress={this.props.goToPlaceDetails}>
                    <Text style={styles.placeName}>
                      {helpers.shortenerAfterFullWord(place.toJSON().name)}
                    </Text>
                  </TouchableOpacity>
                }
                {
                  place.toJSON().local &&
                  <TouchableOpacity onPress={this.props.goToPlaceDetails}>
                    <Text style={styles.local}>{place.toJSON().local.split(',')[0]}</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>

            <View style={{ justifyContent: 'center', flex: 0.8, alignItems: 'center' }}>
              {this.followStatus(follow)}
              <View style={{ marginBottom: 15 }}>
                <PlaceCardRate rate={stars} />
              </View>
          </View>
        {/* </View>
        <View style={{ justifyContent: 'space-between' }}>
          {this.followStatus(follow)}
          <PlaceCardRate rate={stars} /> */}
        </View>
      </View>
    );
  }
}

ProfileName.propTypes = {
  follow_type: PropTypes.string,
  follow: PropTypes.bool.isRequired,
  created_at: PropTypes.string.isRequired,
  user: PropTypes.shape(UserModel.schema).isRequired,
  goToPlaceDetails: PropTypes.func.isRequired,
  goToReviewUserProfile: PropTypes.func.isRequired,
  place: PropTypes.shape(PlaceModel.schema),
  stars: PropTypes.number.isRequired,
  isProfilePressable: PropTypes.bool.isRequired,
  isMyProfile: PropTypes.bool.isRequired,
};
