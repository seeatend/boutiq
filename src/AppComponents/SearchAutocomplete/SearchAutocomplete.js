import React, { PropTypes } from 'react';
import {
	StyleSheet,
	View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Styles, x } from 'AppStyles';
import settings from '../../../settings.json';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    zIndex: 50,
    backgroundColor: '#fff',
  },
});

export const SearchAutocomplete = ({
  placeholder,
  placesType,
  getPlace,
  containerStyle,
  hideCancel,
  textInputContainer,
  textInput,
  listView
}) => (
  <View style={[styles.wrapper, containerStyle]}>
    <GooglePlacesAutocomplete
      keyboardShouldPersistTaps={true}
      placeholder={placeholder}
      minLength={2}
      autoFocus={true}
      fetchDetails={true}
      onPress={getPlace}
      getDefaultValue={() => ''}
      query={{
        key: settings.GOOGLE_PLACES_KEY,
        language: 'en',
        types: `${placesType}`,
      }}
      styles={{
        textInputContainer: [{
          marginBottom: 0,
          width: x,
          backgroundColor: Styles.COLOR_GREEN,
          height: 60,
          alignItems: 'center',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }, textInputContainer],
        textInput: [{
          borderRadius: 1,
          alignSelf: 'center',
          backgroundColor: Styles.COLOR_WHITE,
          fontSize: 17,
          height: 40,
          width: x - 45,
          color: Styles.COLOR_DARKER_45,
        }, textInput],
        listView
      }}
      currentLocation={false}
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        types: 'food,establishment,geocode',
      }}
      enablePoweredByContainer={false}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      predefinedPlacesAlwaysVisible={false}
    />
    {
      !hideCancel &&
      <TouchableOpacity
        onPress={() => {
          console.log("CANCEL");
        }}
      >
        <Text>Cancel</Text>
      </TouchableOpacity>
    }
  </View>
);

SearchAutocomplete.propTypes = {
  containerStyle: PropTypes.object,
  placeholder: PropTypes.string,
  getPlace: PropTypes.func.isRequired,
  placesType: PropTypes.oneOf(['(regions)', 'establishment', 'geocode']).isRequired,
  hideCancel: PropTypes.bool,
  textInputContainer: PropTypes.object,
  textInput: PropTypes.object,
  listView: PropTypes.object,
};

SearchAutocomplete.defaultProps = {
  hideCancel: true,
};
