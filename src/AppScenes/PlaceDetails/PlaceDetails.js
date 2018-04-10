import React, { Component, PropTypes } from 'react';
import {
  View,
  Navigator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  MapView,
  Image,
  StyleSheet,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import autobind from 'autobind-decorator';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PubSub from 'pubsub-js';
import Swiper from 'react-native-swiper';
import { tracker, Boutiq } from 'AppServices';
import { ReviewModel, PlaceModel } from 'AppModels';
import { ReviewCreator } from 'AppScenes';
import {
  TagsView,
  ButtonView,
  NavBarClose,
  PlaceCardRate,
  PlaceReview,
  PaginatedListView
} from 'AppComponents';
import { Styles, x } from 'AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonFavouriteContainer: {
    position: 'absolute',
    bottom: 25,
    left: x - 75,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: Styles.COLOR_NORMAL_GREY,
    shadowColor: Styles.COLOR_NORMAL_GREY,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    },
    backgroundColor: 'white'
  },
  tabsContent: {
    flexDirection: 'column',
    backgroundColor: Styles.COLOR_LIGHTER_3,
    flex: 1,
  },
  textAddress: {
    fontSize: 12,
    color: Styles.COLOR_DARKER_45,
    zIndex: -1,
    width: x - 100
  }
});

export class PlaceDetails extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    source: PropTypes.oneOf(['MyNetwork', 'Discover']),
    review: PropTypes.shape(ReviewModel.schema),
    navigateTo: PropTypes.func.isRequired,
    place: PropTypes.shape(PlaceModel.schema),
    handleLike: PropTypes.func,
  }

  static defaultProps = {
    source: 'MyNetwork'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      avgRating: null,
      otherAvgRating: null,
      source: this.props.source,
      place: props.review ? props.review.get('place').props : props.place.props,
      review: this.props.review,
      placeReview: props.place && props.place.get('id')
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  onRefresh() {
    this.setRefresh();
    this.stopRefresh();
  }

  @autobind
  getRating(avgRating, otherAvgRating) {
    this.setState({
      avgRating,
      otherAvgRating,
      isLoading: false
    });
  }

  setRefresh() {
    this.setState({
      isResfreshing: true
    });
  }

  stopRefresh() {
    this.setState({
      isResfreshing: false
    });
  }

  @autobind
  handledisableButton() {
    const { likeButtonDisabled } = this.state;
    this.setState({
      likeButtonDisabled: !likeButtonDisabled
    });
  }

  checkScrollViewPosition(e) {
    if (e.nativeEvent.contentOffset.y > this.scrollViewHeight - 250) {
      this.setState({
        scroolViewWrapperEnable: false
      });
    }
  }

  @autobind
  handleLike() {
    const { handleLike } = this.props;
    const {
      id: placeId,
      place_liked: placeLiked,
    } = this.state.place;
    const isPlaceLiked = !placeLiked;
    this.setState({
      likeButtonDisabled: true,
      place: Object.assign({}, this.state.place, { place_liked: isPlaceLiked })
    });
    if (!handleLike) {
      const action = isPlaceLiked ? 'like' : 'unlike';
      Boutiq[action]({ entity: 'places', entity_id: placeId })
      .then(() => {
        PubSub.publish('updatePlace', { placeId, isPlaceLiked });
      })
      .catch(() => Alert.alert(
        'Warning',
        'A problem happened while you tried to like this place',
        [
        { text: 'OK', onPress: () => {} },
        ]
      ))
      .then(() => {
        this.handledisableButton();
      });
    } else {
      handleLike('places', placeId, isPlaceLiked)
      .then(() => {
        PubSub.publish('updatePlace', { placeId, isPlaceLiked });
      })
      .catch(() => Alert.alert(
        'Warning',
        'A problem happened while you tried to like this place',
        [
          { text: 'OK', onPress: () => {} },
        ]
      ))
      .then(() => {
        this.handledisableButton();
      });
    }
  }

  renderListItem(rowData) {
    const review = new ReviewModel(rowData);
    return (
      <PlaceReview
        source={this.props.source}
        isPlacePressable={false}
        navigateTo={this.props.navigateTo}
        review={review}
        currentUser={this.props.user}
        handleLike={this.props.handleLike}
      />
    );
  }

  renderPhoto(photos) {
    if (!photos || photos.length === 0) {
      return null;
    }
    return (
      <View style={{ width: x, height: x / 1.91 }}>
        <Swiper loop={true} >
          {photos.map((uri, id) => (
            <Image
              key={id}
              resizeMode="cover"
              style={{ width: x, height: x / 1.91 }}
              source={{ uri }}
            />
          ))}
        </Swiper>
      </View>
    );
  }

  render() {
    const {
      id: placeId,
      name,
      local,
      country,
      name_address: nameAddress,
      tag_names: tagNames,
      place_liked: placeLiked,
      best_rated_pictures: bestRatedPictures,
      lat: latitude,
      lng: longitude,
      photo: defaultPhoto,
    } = this.state.place;

    const hasNoPicture = (!bestRatedPictures || bestRatedPictures.length === 0)
      && defaultPhoto === '';
    let photos = bestRatedPictures;
    if (defaultPhoto) {
      photos = bestRatedPictures.concat([defaultPhoto]);
    }
    const {
      source,
      likeButtonDisabled,
      avgRating,
      otherAvgRating,
      isLoading
    } = this.state;
    const initialPageIndex = this.props.source === 'MyNetwork' ? 0 : 1;
    tracker.event({ category: 'navigation', action: tracker.feedName(initialPageIndex) });
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{ title: 'PLACE DETAILS', style: { color: '#FFF' } }}
          tintColor={Styles.COLOR_GREEN}
          leftButton={<NavBarClose {...this.props} />}
        />
        <ScrollView
          ref={c => this.refScrollView = c}
          scrollEventThrottle={300}
          onScroll={(e :Object) => this.checkScrollViewPosition(e)}
        >
          {this.renderPhoto(photos)}
          <View style={{ flex: 1, padding: 20, marginTop: 10, alignItems: 'stretch' }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5
            }}
            >
              {/* <View style={{ flexDirection: 'row', width: x }}> */}
              <Text style={{ color: Styles.COLOR_DARKER_45, fontWeight: '700', width: x - 100 }}>
                {name}
              </Text>
              {/* </View> */}
              {/* <View> */}
              <ButtonView
                disabled={likeButtonDisabled}
                styleContainer={[styles.buttonFavouriteContainer, hasNoPicture && { top: -30 }]}
                iconInfo={{
                  name: placeLiked ? 'heart' : 'heart-o',
                  color: placeLiked ? Styles.COLOR_GREEN : Styles.FONT_COLOR
                }}
                callback={() => this.handleLike()}
              />
              <TouchableOpacity
                style={[
                  { position: 'absolute', right: -4, zIndex: 10 },
                  hasNoPicture && { top: 20 }
                ]}
                onPress={() => {
                  this.props.navigateTo({
                    verb: 'push',
                    sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                    scene: ReviewCreator,
                    place: this.state.place
                  });
                }}
              >
                <Image
                  style={{ width: 40,
                  height: 40, }}
                  source={require('../../../assets/post_btn@1x.png')}
                />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <Text style={styles.textAddress}>
              {nameAddress && `${nameAddress} `}
            </Text>
            <Text style={[styles.textAddress, { marginBottom: 10 }]}>
              {country}
            </Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={{ color: Styles.COLOR_DARKER_30 }}>
                {source === 'MyNetwork' ? 'Network Users Ratings' : 'Other users Rating'}
              </Text>
              {
                !isLoading &&
                <PlaceCardRate rate={source === 'MyNetwork' ? avgRating : otherAvgRating} />
              }
            </View>
            <View style={{ marginTop: 10 }}>
              <TagsView tags={tagNames} />
            </View>
            <MapView
              style={{ height: 170, marginTop: 10, marginBottom: 10 }}
              scrollEnabled={false}
              region={{
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
              annotations={[
                {
                  latitude,
                  longitude,
                  tintColor: Styles.COLOR_GREEN,
                  title: name
                }
              ]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollableTabView
              initialPage={initialPageIndex}
              tabBarActiveTextColor={Styles.COLOR_GREEN}
              tabBarInactiveTextColor={Styles.COLOR_DARKER_15}
              tabBarUnderlineStyle={{ backgroundColor: Styles.COLOR_GREEN }}
              onChangeTab={({ i }) => {
                this.setState({
                  source: source === 'MyNetwork' ? 'Discover' : 'MyNetwork'
                });
                tracker.event({ category: 'navigation', action: tracker.feedName(i) });
              }}
            >

              <View tabLabel="My network" style={styles.tabsContent}>
                <PaginatedListView
                  isScrollEnable={false}
                  renderListItem={this.renderListItem}
                  getRating={this.getRating}
                  placeId={placeId}
                  type="PlaceReviewsByMyNetwork"
                  massagePayload={(payload) => {
                    const {
                      network_current_page: current_page,
                      network_total_entries: total_entries,
                      network_per_page: per_page,
                      network_entries: entries,
                    } = payload;
                    return { current_page, entries, per_page, total_entries };
                  }}
                />
              </View>
              <View tabLabel="Discover more" style={styles.tabsContent}>
                <PaginatedListView
                  isScrollEnable={false}
                  renderListItem={this.renderListItem}
                  getRating={this.getRating}
                  placeId={placeId}
                  type="PlaceReviewsByOthers"
                  massagePayload={(payload) => {
                    const {
                      other_current_page: current_page,
                      other_total_entries: total_entries,
                      other_per_page: per_page,
                      other_entries: entries,
                    } = payload;
                    return { current_page, entries, per_page, total_entries };
                  }}
                />
              </View>
            </ScrollableTabView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
