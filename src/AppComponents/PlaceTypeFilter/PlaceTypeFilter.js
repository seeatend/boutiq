import React, { Component, PropTypes } from 'react';
import {
  Navigator,
  View,
  Text,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
  Image
} from 'react-native';
import _ from 'lodash';
import MapView from 'react-native-maps';
import {
  PlaceDetails
} from 'AppScenes';
import {
  Tags,
  MapViewButton
} from 'AppComponents';
import { PlaceModel } from 'AppModels';
import { Styles, x } from 'AppStyles';
import { Boutiq } from 'AppServices';

const styles = StyleSheet.create({
  /* eslint-disable */
  container: {
    width: x,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  wrapperTagsView: {
    marginTop: 15,
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  tagsView: {
    flexDirection: 'row',
    width: x - 40,
    justifyContent: 'space-between'
  },
  /* eslint-enable */
  commonTextStyle: {
    fontSize: 16,
    color: Styles.COLOR_DARKER_30,
  },
  buttonCallout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Styles.COLOR_WHITE,
    width: 100,
    height: 45,
    borderRadius: 10
  }
});

export class PlaceTypeFilter extends Component {
  static labels = ['Eat', 'Drink', 'Sleep', 'Do'];
  static propTypes = {
    navigator: PropTypes.object,
    handleStateMapView: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    isMapView: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    feedName: PropTypes.string,
    handleTags: PropTypes.func,
    placeData: PropTypes.array,
    totalEntries: PropTypes.number.isRequired,
  }
  constructor(props) {
    super(props);
    this.tags = {};
    this.initialRegion = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    };
    this.state = {
      viewStyle: {
        height: 150,
        justifyContent: 'center'
      },
      picker: {
        selected1: 'Top rated',
        selected2: 'Date'
      },
      isFirstLoadMap: false,
      placeData: this.props.placeData,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      },
    };
    this.handleMapView = this.handleMapView.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.handlePlaceData = this.handlePlaceData.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.goToPlaceDetails = this.goToPlaceDetails.bind(this);
  }

  componentDidMount() {
    const { latitude, longitude } = this.state.region;
    this.loadPage(latitude, longitude);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placeData && nextProps.placeData.length > 0) {
      const pdata = nextProps.placeData[0];
      this.initialRegion = {
        latitude: pdata.lat,
        longitude: pdata.lng,
        latitudeDelta: 0.013,
        longitudeDelta: 0.013,
      };
    }
  }

  onRegionChangeComplete = (region) => {
    const { longitude, latitude } = region;
    if (!this.state.isFirstLoadMap) {
      this.loadPage(latitude, longitude);
    } else {
      this.setState({ isFirstLoadMap: false });
    }
  };

  loadPage(lat, lng) {
    const { feedName } = this.props;
    if (lat === 0) {
      return true;
    }
    return Boutiq[`get${feedName}`]({ lat, lng })
    .then((payload) => {
      const { entries } = payload;
      this.handlePlaceData(entries);
    });
  }

  handlePlaceData(data) {
    if (data) {
      const placeData = _.map(data, ({ place }) => place);
      this.initialRegion = {
        latitude: placeData[0].lat,
        longitude: placeData[0].lng,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      };
      this.setState({ placeData });
    }
  }

  handleMapView() {
    const { viewStyle } = this.state;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      viewStyle: {
        height: viewStyle.height > 150 ? 150 : 400
      },
    });
    this.props.handleStateMapView();
  }

  goToPlaceDetails(marker) {
    const place = new PlaceModel(marker);
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: PlaceDetails,
      place,
      source: this.props.source,
      handleLike: this.props.handleLike
    });
  }

  render() {
    const { isMapView, totalEntries, feedName, handleTags } = this.props;
    const viewStyle = [styles.container, this.state.viewStyle];
    const mapData = (this.state.placeData && this.state.placeData)
    || (this.props.placeData && this.props.placeData);
    const recommendedBy = feedName === 'MyNetworkSearch' ? 'your network' : 'public users';
    return (
      <Animated.View style={viewStyle}>
        <MapViewButton ref={c => this.refButton = c}
          handleMapView={this.handleMapView}
          isMapView={this.props.isMapView}
        />
        <View
          style={[styles.wrapperTagsView, isMapView && {
            justifyContent: 'flex-start', height: 50
          }]}
        >
          <Tags
            tagsLabel="Tags: "
            onTagSelected={handleTags}
          />
          {
            !isMapView &&
            <Text style={styles.commonTextStyle}>
              {totalEntries} places recommended by {recommendedBy}
            </Text>
          }
        </View>
        {
          isMapView &&
          <MapView
            style={{ height: 250, width: x }}
            annotations={this.props.placeData}
            initialRegion={this.initialRegion}
            showsUserLocation={true}
            onRegionChangeComplete={this.onRegionChangeComplete}
            loadingEnable={true}
          >
            {mapData.map((marker, id) => (
              marker.lat && marker.lng &&
              <MapView.Marker
                key={id}
                coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                title={marker.name}
                description=""
              >
                {/* <Image style={{ width: 20, height: 25 }} source={require('../../../assets/pin_green@1x.png')} /> */}
                <MapView.Callout tooltip={true} width={100}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonCallout}
                    onPress={() => this.goToPlaceDetails(marker)}
                  >
                    <Text>{marker.name}</Text>
                  </TouchableOpacity>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>
        }
      </Animated.View>
    );
  }
}
