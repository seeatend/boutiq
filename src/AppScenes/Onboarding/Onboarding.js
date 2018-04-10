import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SearchAutocomplete } from 'AppComponents';
import { Styles, x } from 'AppStyles';
import { styles } from './styles';

export class Onboarding extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.onDismiss = this.onDismiss.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentDidMount() {
  //   console.log("this.location, this.email", this.location, this.email);
  // }
  onDismiss() {
    this.props.onDismiss();
  }
  onSubmit() {
    this.props.onSubmit({
      location: this.location._lastNativeText,
      email: this.email._lastNativeText
    });
  }
  render() {
    return (
      <Image
        style={styles.wrappingImage}
        source={require('../../../assets/onboarding_info.png')}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.buttonSkip}
            onPress={this.onDismiss}
          >
            <Text style={styles.buttonSkipText}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.form}>
            <Text style={styles.textIntro}>
              Boutiq can help you discover great places just for you
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="next"
              style={styles.inputText}
              ref={e => this.location = e}
              placeholder="City where you live"
              autoCorrect={false}
              autoFocus={true}
              onSubmitEditing={() => this.email.focus()}
            />
            {/* <SearchAutocomplete
              ref={e => this.location = e}
              placeholder="City where you live"
              placesType="geocode"
              containerStyle={{
                position: 'absolute',
                top: 90,
                left: 30,
                height: 40,
              }}
              textInputContainer={{
                backgroundColor: 'transparent',
                alignItems: 'center',
              }}
              textInput={{
                color: Styles.COLOR_DARKER_45,
                position: 'absolute',
                top: -7,
                left: -8,
                height: 40,
                width: x - 80
              }}
              listView={{
                backgroundColor: '#fff',
                position: 'absolute'
              }}
            /> */}
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="done"
              style={styles.inputText}
              // style={[styles.inputText, { marginTop: 65, color: Styles.COLOR_DARKER_45 }]}
              keyboardType="email-address"
              ref={e => this.email = e}
              placeholder="Your email address"
              autoCorrect={false}
              onSubmitEditing={this.onDismiss}
            />
            <TouchableOpacity
              style={styles.buttonSubmit}
              onPress={this.onDismiss}
            >
              <Text style={styles.buttonSubmitText}>Let's start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Image>
    );
  }
}
