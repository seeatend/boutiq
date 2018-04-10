import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Styles } from 'AppStyles';
import { GoogleMapWebView } from 'AppComponents';

const styles = StyleSheet.create({
  wrapper: {
    height: 120,
  },
});

export class PlacePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: null
    };
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (currentPosition) => {
        this.setState({ currentPosition: Object.assign(currentPosition, {
          coords: { latitude: -33.881418, longitude: 151.200736 }
        }) });
      },
      () => {
        this.setState({
          currentPosition: { coords: { latitude: -33.881418, longitude: 151.200736 } },
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );
  }
  showLoader() {
    let view;
    if (!this.state.currentPosition) {
      view = (
        <ActivityIndicator size="large" />
      );
    } else {
      view = <View />;
    }
    return view;
  }
  showMap() {
    let view;
    if (this.state.currentPosition) {
      view = (
        <GoogleMapWebView center={this.state.currentPosition} {...this.props} />
      );
    } else {
      view = <View />;
    }
    return view;
  }
  render() {
    return (
      <View style={styles.wrapper}>
        {this.showLoader()}
        {this.showMap()}
      </View>
    );
  }
}
