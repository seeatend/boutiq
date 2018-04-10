import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
  Alert,
	TouchableWithoutFeedback,
  Navigator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';
import { TagsView, ButtonView, ProfilePhoto, PlaceCardRate } from 'AppComponents';
import { PlaceDetails } from 'AppScenes';
import { PlaceModel } from 'AppModels';
import { Styles, x } from 'AppStyles';
import _ from 'lodash';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: Styles.GUTTER,
    backgroundColor: Styles.COLOR_WHITE,
  },
  container: {
    flexDirection: 'row',
    height: 200,
  },
  wrapperCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 10,
    width: x
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
  },
  viewCardInfo: {
    backgroundColor: 'transparent',
    marginTop: 10
  },
  labelTextPlace: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },
  buttonFavouriteContainer: {
    marginLeft: 20
  },
  wrapperBottomImageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export class PlaceCard extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    place: PropTypes.shape(PlaceModel.schema),
    lastReviewProfiles: PropTypes.bool,
    recommended_users_avatar: PropTypes.array,
    handleLike: PropTypes.func.isRequired,
    source: PropTypes.string,
  };

  static defaultProps = {
    lastReviewProfiles: true
  }

  constructor(props) {
    super(props);
    this.place = new PlaceModel(props.place);
    this.state = {
      likeButtonDisabled: false,
      isPlaceLiked: this.place.get('place_liked')
    };
  }

  @autobind
  handleGotoPlaceDetails() {
    const { place } = this;
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: PlaceDetails,
      place,
      source: this.props.source,
      handleLike: this.props.handleLike
    });
  }

  @autobind
  handledisableButton() {
    const { likeButtonDisabled } = this.state;
    this.setState({
      likeButtonDisabled: !likeButtonDisabled
    });
  }

  addressFormater(address) {
    const index = address.indexOf(',', address.indexOf(',') + 1);
    const substring = address.slice(0, index);
    return substring;
  }

  @autobind
  handleLikePress() {
    const { isPlaceLiked } = this.state;
    const placeId = this.place.get('id');
    this.setState({
      isPlaceLiked: !isPlaceLiked,
      likeButtonDisabled: true
    });
    this.props.handleLike('places', placeId, !isPlaceLiked)
    .then(() => {
      PubSub.publish('updatePlace', { placeId, isPlaceLiked });
    })
    .catch(() => Alert.alert(
      'Warning',
      'A problem happened while you tried to like this place',
      [
        { text: 'OK', onPress: () => this.handledisableButton() },
      ]
    ))
    .then(() => {
      this.handledisableButton();
    });
  }

  render() {
    const { isPlaceLiked, likeButtonDisabled } = this.state;
    const {
      name_address: nameAddress,
      name,
      local,
      tag_names: tagNames,
      photo,
      friends_avg: friendsAvg,
      friends_avg_count: friendsAvgCount,
      recommended_users_avatar,
      best_rated_pictures,
    } = this.place.toJSON();
    const imageUrl = best_rated_pictures.length > 0 ? best_rated_pictures[0] : photo;
    return (
      <View style={styles.wrapper} >
        {this.props.lastReviewProfiles &&
          <View style={{ flexDirection: 'row', height: 40 }}>
          {_.times(recommended_users_avatar.length, (idx) => (
            <View style={{ position: 'absolute', top: 5, left: 20 * (idx + 1) }} key={idx}>
              <ProfilePhoto
                type="circle"
                size={30}
                border={true}
                borderColor="#fff"
                source={recommended_users_avatar[idx]}
              />
            </View>
          ))}
        </View>
        }
        <TouchableWithoutFeedback onPress={this.handleGotoPlaceDetails}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.container}
          >
            <LinearGradient
              locations={[0, 0.4]}
              colors={[Styles.COLOR_DARKER_60, 'transparent']}
              style={styles.linearGradient}
            >
              <View style={styles.wrapperCardInfo}>
                <View style={[styles.viewCardInfo, { flex: 4.5 }]}>
                  <Text style={[styles.labelTextPlace,
                      nameAddress && nameAddress.length > 30 && { fontSize: 15 }]}
                  >
                    {name}
                  </Text>
                  <Text style={{ color: '#fff' }}>
                    {local}
                  </Text>
                </View>
                {(friendsAvg && friendsAvgCount) &&
                <View
                  style={[styles.viewCardInfo,
                    { flexDirection: 'row', flex: 2.2, justifyContent: 'center' }]}
                >
                  <PlaceCardRate rate = {friendsAvg} />
                  <Text style={{ color: '#fff' }}>
                    ({ friendsAvgCount || 0 })
                  </Text>
                </View>}
              </View>
            </LinearGradient>
          </Image>
        </TouchableWithoutFeedback>
        <View style={styles.wrapperBottomImageInfo}>
          <ButtonView
            disabled={likeButtonDisabled}
            styleContainer={styles.buttonFavouriteContainer}
            iconInfo={{
              name: isPlaceLiked ? 'heart' : 'heart-o',
              color: isPlaceLiked ? Styles.COLOR_GREEN : Styles.FONT_COLOR
            }}
            callback={this.handleLikePress}
          />
          <View style={{ marginRight: 20, marginTop: 10 }}>
            <TagsView tags={tagNames} />
          </View>
        </View>
      </View>
    );
  }
}
