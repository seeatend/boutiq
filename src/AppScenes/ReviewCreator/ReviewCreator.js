import React, { Component, PropTypes } from 'react';
import PubSub from 'pubsub-js';
import {
	View,
	Text,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import autobind from 'autobind-decorator';
import NavigationBar from 'react-native-navbar';
import {
	Tags,
  Alert,
  PhotoFrame,
  CameraButton,
	Rate,
  Loading,
  PlacePicker,
  NavBarClose,
} from 'AppComponents';
import { imagePicker, tracker } from 'AppServices';
import { ReviewModel } from 'AppModels';

import { Styles, y } from 'AppStyles';
import { styles } from './styles';

export class ReviewCreator extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    place: PropTypes.object
  }
  // static defaultProps = {
  //   place: {}
  // }

  constructor(props) {
    super(props);
    this.state = {
      placeProvided: !!props.place,
      place: props.place || {},
      isLoading: false,
      tags: [],
      rating: null,
      review: '',
      imagePlace: [],
      alertType: null,
      alertMessage: null,
      inputFocused: false
    };
    this.tagSelection = null;
    this.selectImage = this.selectImage.bind(this);
    this.setSource = this.setSource.bind(this);
    this.buildReview = this.buildReview.bind(this);
    this.onCloseFrame = this.onCloseFrame.bind(this);
    this.fadeValue = new Animated.Value(1);
    // this.heightValue = new Animated.Value(180);
  }

  onCloseFrame() {
    this.setState({
      imagePlace: []
    });
  }

  setSource(imagePlace) {
    this.setState({ imagePlace: [imagePlace] });
  }

  reviewValidator() {
    tracker.event({ category: 'post', action: 'postReview', options: {
      label: 'failure',
      value: 1
    } });
    this.setState({
      isLoading: false,
      alertMessage: 'Some data is missing to create a review',
      alertType: 'error'
    }, () => setTimeout(() => {
      this.setState({
        alertMessage: null,
        alertType: null
      });
    }, 3000));
  }

  buildReview() {
    const { imagePlace, place, review: text, placeProvided } = this.state;
    if (placeProvided) {
      let attributes = _.pick(place, 'name', 'name_address', 'local', 'lat', 'lng',
      'administrative_area_level_1', 'country', 'google_place_id', 'route', 'neighborhood');
      let placeAttribute = Object.assign({}, attributes, { streetNumber: attributes.name_address.substr(0, attributes.name_address.indexOf(' ')) });
      const review = new ReviewModel({
        text,
        stars: String(this.rateSelection.state.rateValue),
        tag_names: this.tagSelection.getSelectedTags(),
        pictures_attributes: imagePlace.map(image => Object.assign({
          name: 'picname',
          image: image.uri,
        })),
        place_attributes: placeAttribute
      });
      this.setState({
        isLoading: true,
      });
      tracker.event({ category: 'post', action: 'postReview', options: {
        label: 'success',
        value: 1
      } });
      return review.create()
      .then(reviewCreated => {
        this.setState({
          isLoading: false
        });
        PubSub.publish('createdReview', reviewCreated.toJSON());
        this.props.navigator.pop();
      })
      .catch(e => {
        this.setState({
          isLoading: false,
          alertMessage: e,
          alertType: 'error'
        }, () => setTimeout(() => {
          this.setState({
            alertMessage: null,
            alertType: null
          });
        }, 3000)
      );
      });
    }

    if (!this.rateSelection.state.rateValue || !place.place_id
      || this.tagSelection.getSelectedTags().length === 0 || !text) {
      return this.reviewValidator();
    }
    let placeAttributes;
    if (place.vicinity) {
      const {
        name,
        vicinity,
        place_id,
        address_components,
        geometry,
      } = place;
      const streetNumber = vicinity.substr(0, vicinity.indexOf(' '));
      const locality = vicinity.substr(vicinity.indexOf(',') + 1);
      const addrCompLength = address_components.length;
      placeAttributes = {
        name,
        name_address: vicinity,
        street_number: streetNumber,
        lat: geometry.location.lat,
        lng: geometry.location.lng,
        locality,
        administrative_area_level_1: address_components[addrCompLength - 2].short_name,
        country: address_components[addrCompLength - 2].long_name,
        postal_code: address_components[addrCompLength - 1].long_name,
        google_place_id: place_id,
        route: '',
        neighborhood: ''
      };
    }
    if (!place.vicinity) {
      const {
        name,
        place_id,
        address_components,
        geometry,
      } = place;
      // const streetNumber = vicinity.substr(0, vicinity.indexOf(' '));
      // const locality = vicinity.substr(vicinity.indexOf(',') + 1);
      const addrCompLength = address_components.length;
      placeAttributes = {
        name,
        // name_address: 'none',
        // street_number: 'none',
        lat: geometry.location.lat,
        lng: geometry.location.lng,
        // locality: 'none',
        administrative_area_level_1: address_components[addrCompLength - 2].short_name,
        country: address_components[addrCompLength - 2].long_name,
        postal_code: address_components[addrCompLength - 1].long_name,
        google_place_id: place_id,
        route: '',
        neighborhood: ''
      };
    }
    const review = new ReviewModel({
      text,
      stars: String(this.rateSelection.state.rateValue),
      tag_names: this.tagSelection.getSelectedTags(),
      pictures_attributes: imagePlace.map(image => Object.assign({
        name: 'picname',
        image: image.uri,
      })),
      place_attributes: placeAttributes
    });
    this.setState({
      isLoading: true,
    });
    tracker.event({ category: 'post', action: 'postReview', options: {
      label: 'success',
      value: 1
    } });
    return review.create()
    .then(reviewCreated => {
      this.setState({
        isLoading: false
      });
      PubSub.publish('createdReview', reviewCreated.toJSON());
      this.props.navigator.pop();
    })
    .catch(e => {
      this.setState({
        isLoading: false,
        alertMessage: e,
        alertType: 'error'
      }, () => setTimeout(() => {
        this.setState({
          alertMessage: null,
          alertType: null
        });
      }, 3000)
    );
    });
  }

  selectImage() {
    imagePicker.show()
      .then(({ type, source }) => {
        if (!type) {
          this.setSource(source);
        }
      })
      .catch(() => { console.log('pb with camera picker');});
  }

  @autobind
  handleTextInputFocus() {
    const { inputFocused } = this.state;
    Animated.parallel([
      // Animated.spring(
      //   this.heightValue,
      //   {
      //     duration: 1000,
      //     toValue: inputFocused ? 180 : 250,
      //     friction: 1
      //   }
      // ),
      Animated.timing(
        this.fadeValue,
        {
          duration: 150,
          toValue: inputFocused ? 1 : 0
        },
      )
    ]).start();
    setTimeout(() => {
      this.setState({
        inputFocused: !inputFocused
      });
    }, 150);
  }

  handleStyleInput() {
    const { inputFocused } = this.state;
    if (inputFocused) {
      return styles.reviewTextInputFocused;
    }
    return styles.reviewTextInput;
  }

  render() {
    const { imagePlace, isLoading, alertMessage, alertType, inputFocused, placeProvided } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
			<View style={styles.wrapper}>
        <NavigationBar
          tintColor={Styles.COLOR_GREEN}
          title={{ title: 'RECOMMEND A PLACE', style: Styles.NAVBAR }}
          leftButton={<NavBarClose {...this.props} />}
        />
        <ScrollView
          style={{ flex: 1 }}
        >
          <Alert alertMessage={alertMessage} alertType={alertType} />
            {!placeProvided &&
              <PlacePicker onPlaceSelected={(place) => this.setState({ place })} />}
            {placeProvided &&
              <Text style={{
                marginTop: 20,
                alignSelf: 'center',
                height: 30,
                fontSize: 20 }}
              >
                {this.state.place.name}
              </Text>}
          <KeyboardAvoidingView
            style={{ zIndex: -10, padding: 10, }}
            keyboardVerticalOffset={!!imagePlace[0] ? -y / 1.8 : 30}
            behavior="position"
          >
            <Animated.View style={{ opacity: this.fadeValue }}>
              <Tags
                ref={e => this.tagSelection = e}
                tagsLabel="Tags"
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: Styles.FONT_COLOR }}>Your rating</Text>
                <Rate
                  ref={e => this.rateSelection = e}
                  rateLabel={true}
                />
              </View>
            </Animated.View>
            <Animated.View>
              <TextInput
                multiline={true}
                style={this.handleStyleInput()}
                onFocus={this.handleTextInputFocus}
                returnKeyType="done"
                blurOnSubmit={true}
                onBlur={this.handleTextInputFocus}
                placeholder="Write your recommendation"
                onChangeText={review => {this.setState({ review });}}
              />
            </Animated.View>
              {!inputFocused &&
            <View>
              <CameraButton
                containerStyle={{ alignSelf: 'center', marginTop: - 30 }}
                openCameraPicker={this.selectImage}
              />
              {imagePlace[0] &&
              <PhotoFrame
                open={imagePlace[0]}
                closeFrame={this.onCloseFrame}
              >
                <Image
                  style={{ flex: 1 }}
                  resizeMode="cover"
                  source={{ uri: imagePlace[0].uri }}
                />
              </PhotoFrame>}
            </View>}


            {/* <View style={styles.wrapperSocialMedia}>
              <Text style={{ color: Styles.FONT_COLOR }}>Share on:</Text>
              <Image
                style={styles.imageSocial}
                source={require('../../../assets/fb_checkbox@1x.png')}
              />
            </View> */}
          </KeyboardAvoidingView>
				</ScrollView>
        <TouchableOpacity
          style={{
            borderTopWidth: 1,
            borderColor: '#777',
          }} onPress={this.buildReview}
        >
					<Text style={styles.postBtn}>POST YOUR RECOMMENDATION</Text>
				</TouchableOpacity>
			</View>
		);
  }
}
