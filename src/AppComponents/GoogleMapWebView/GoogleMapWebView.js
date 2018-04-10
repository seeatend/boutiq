import React, { Component, PropTypes } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  WebView,
} from 'react-native';
import { SearchAutocomplete } from 'AppComponents';
import { GOOGLE_MAP_KEY as API_KEY } from '../../../settings.json';
import { logFactory } from './helpers';
import { webview } from './Webview';
import { Styles, x, y } from 'AppStyles';
import injectScriptFactory from './InjectedScript';

const log = logFactory(true);

const gmapCoordinateRegex = /(?=)([\-]?[\d]*\.[\d]*),([\-]?[\d]*\.[\d]*)(?=&)/;

export class GoogleMapWebView extends Component {
  static propTypes = {
    center: PropTypes.object.isRequired,
    onPlaceSelected: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.webview = null;
    this.onMessage = this.onMessage.bind(this);
    this.searchSelected = this.searchSelected.bind(this);
    this.placePicked = this.placePicked.bind(this);
    this.state = {
      place: null,
      loading: false,
    };
  }

  onMessage(e) {
    const { data: message } = e.nativeEvent;
    // try {
    //   log(message);
    //   const m = JSON.parse(message);
    //   switch (m.header) {
    //     case 'callback':
    //       const { channel, state, data } = m;
    //       this.webview.channels[channel][state](data);
    //       break;
    //     default:
    //       if (m.eventName === 'place_picked_start') {
    //         this.setState({ loading: true });
    //       } else if (m.eventName === 'place_picked_end') {
    //         this.placePicked(m.data);
    //       }
    //   }
    // } catch (e) {
    //   console.warn('webview says', message);
    // }
  }
  searchSelected({ lat, lng }) {
    this.webview.call('gmap.setCenter', { lat, lng })
    .then((d) => {
      log('resolve1!', d);
      return "LOL";
    });
  }

  placePicked({ place }) {
    this.setState({
      loading: false,
      place: Object.assign({}, place),
    });
    this.props.onPlaceSelected(place);
  }

  injectScript() {
    const { coords } = this.props.center;
    const latLng = {
      lat: coords.latitude,
      lng: coords.longitude
    };

    const params = { latLng, gmapCoordinateRegex, API_KEY };

    const injectScript = injectScriptFactory();
    return `(${String(injectScript)})(${JSON.stringify(params)})`;
  }
  renderLoader() {
    return (
      <View style={{
        backgroundColor: 'rgba(150, 150, 150, 0.6)',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <ActivityIndicator color="#FFF" />
        <Text style={{
          color: '#FFF',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        >
          Loading place details...
        </Text>
      </View>
    );
  }
  render() {
    const ijs = this.injectScript();
    const { place, loading } = this.state;
    return (
      <View>
        <SearchAutocomplete
          placesType=""
          containerStyle={{ position: 'absolute', zIndex: 300, backgroundColor: Styles.COLOR_LIGHTER_0 }}
          placeholder="Type the place name..."
          getPlace={(data, details) => {
            this.placePicked({ place: details });
          }}
        />
        <View
          style={{
            zIndex: -100,
            position: 'absolute',
            top: 85,
            width: x,
            zIndex: 100,
          }}
        >
          {/* <Text
            style={{
              zIndex: -100,
              fontSize: 16,
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            {place && place.name}
          </Text> */}
        </View>
        {loading && this.renderLoader()}
      </View>
    );
  }
}
