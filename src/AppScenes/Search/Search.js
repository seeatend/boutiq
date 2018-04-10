import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Navigator,
  Alert,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import {
  SearchAutocomplete,
  NavBarClose,
} from 'AppComponents';
import { Styles } from 'AppStyles';
import { tracker } from 'AppServices';
import { SearchResultScene } from '../SearchResult';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  ViewButtonAround: {
    position: 'absolute',
    top: 165,
  },
  buttonAround: {
    height: 45,
    width: 260,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Styles.COLOR_LIGHTER_5
  },
  textAround: {
    fontSize: 22,
    fontWeight: '600',
    color: Styles.COLOR_DARKER_30
  }
});

export class Search extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      dataPlace: null,
      detailsPlace: null
    };
    this.getPlace = this.getPlace.bind(this);
  }

  getPlace(data, details) {
    this.setState({
      dataPlace: data,
      detailsPlace: details
    });
    this.goToSearchResult();
    // probably have to pass a part of dataplace/details place
  }

  goToSearchResult({ label, location } = {}) {
    const { detailsPlace } = this.state;
    const placeTitle = label || detailsPlace && detailsPlace.vicinity;
    const latLng = location || detailsPlace && detailsPlace.geometry.location;
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromRight,
      scene: SearchResultScene,
      placeTitle,
      latLng,
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <NavigationBar
          tintColor={Styles.COLOR_GREEN}
          title={{ title: 'SEARCH FOR AN AREA', style: Styles.NAVBAR }}
          leftButton={<NavBarClose {...this.props} />}
        />
        <View style={styles.ViewButtonAround}>
          <TouchableOpacity
            style={styles.buttonAround}
            onPress={() => {
              tracker.event({ category: 'search', action: 'aroundMe' });
              navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                  this.goToSearchResult({
                    label: 'Around me',
                    location: {
                      lat: coords.latitude,
                      lng: coords.longitude,
                    }
                  });
                },
                () => {
                  Alert.alert('Around me', 'Please allow Boutiq to access your location in your phone settings.');
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
              );
            }}
          >
            <Text style={styles.textAround}>
              Find places around me
            </Text>
          </TouchableOpacity>
        </View>
        <SearchAutocomplete
          placesType="geocode"
          containerStyle={{ position: 'absolute', top: 62 }}
          placeholder="Where are you looking for places ?"
          getPlace={this.getPlace}
          hideCancel={true}
        />
      </View>
    );
  }
}
