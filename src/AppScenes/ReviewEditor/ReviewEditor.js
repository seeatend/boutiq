import React, { Component, PropTypes } from 'react';
import PubSub from 'pubsub-js';
import {
	View,
	Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import {
	Tags,
  Alert,
  PhotoFrame,
  CameraButton,
	Rate,
  Loading,
  NavBarClose,
} from 'AppComponents';
import { imagePicker, tracker } from 'AppServices';
import { ReviewModel } from 'AppModels';

import { Styles, x, y } from 'AppStyles';
import { styles } from './styles';
import { REVIEW_FIXTURE } from './reviewFixt';

export class ReviewEditor extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    review: PropTypes.shape(ReviewModel.schema),
  }

  static defaultProps = {
    // review: REVIEW_FIXTURE
  }

  constructor(props) {
    super(props);
    const { review } = this.props;
    const IMAGE = props.review.props.pictures.length > 0 ? review.get('pictures')[0].image : null;
    this.state = {
      place: {},
      isLoading: false,
      tags: [],
      rating: null,
      text: review.get('text'),
      imagePlace: IMAGE ? [IMAGE] : [],
      alertType: null,
      alertMessage: null,
      imageUrl: IMAGE ? { uri: IMAGE.url } : {},
      isImage: false,
    };
    this.tagSelection = null;
    this.selectImage = this.selectImage.bind(this);
    this.setSource = this.setSource.bind(this);
    this.buildReview = this.buildReview.bind(this);
    this.onCloseFrame = this.onCloseFrame.bind(this);
  }

  onCloseFrame() {
    this.setState({
      imagePlace: []
    });
  }

  setSource(imagePlace) {
    let source = { uri: imagePlace.uri };
    this.setState({ imagePlace: [imagePlace], imageUrl: source, isImage: true });
  }

  buildReview() {
    const { imagePlace, text, imageUrl, isImage } = this.state;
    const review = new ReviewModel({
      text,
      id: this.props.review.get('id'),
      stars: parseInt(this.rateSelection.state.rateValue, 10),
      tag_names: this.tagSelection.getSelectedTags()
    });
    if (isImage) {
      review.pictures_attributes = imagePlace.map(image =>
        Object.assign({
          name: 'picname',
          image: imageUrl.uri,
        }));
    }
    this.setState({
      isLoading: true,
    });
    tracker.event({ category: 'post', action: 'updatedReview', options: {
      label: 'success',
      value: 1
    } });
    return review.update()
    .then(reviewUpdated => {
      this.setState({
        isLoading: false
      });
      PubSub.publish('updatedReview', reviewUpdated.toJSON());
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

  render() {
    const { imagePlace, isLoading, alertMessage, alertType, imageUrl } = this.state;
    const { review } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    return (
			<View style={styles.wrapper}>
        <NavigationBar
          tintColor={Styles.COLOR_GREEN}
          title={{ title: 'EDIT', style: Styles.NAVBAR }}
          leftButton={<NavBarClose {...this.props} />}
        />
        <ScrollView
          style={{ flex: 1 }}
        >
          <Alert alertMessage={alertMessage} alertType={alertType} />
            <Text style={styles.title}> {review.get('place').get('name')} </Text>
            <KeyboardAvoidingView
              style={{ zIndex: -10, padding: 10, }}
              keyboardVerticalOffset={!!imagePlace[0] ? -y / 1.8 : 30}
              behavior="position"
            >
              <Tags
                ref={e => this.tagSelection = e}
                tagsLabel="Tags"
                tagsSelected={review.get('place').get('tag_names')}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ color: Styles.FONT_COLOR }}>Your rating</Text>
                <Rate
                  ref={e => this.rateSelection = e}
                  rateLabel={true}
                  initValue={review.get('stars')}
                />
              </View>
                <TextInput
                  multiline={true}
                  style={styles.reviewTextInput}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  placeholder="Write your recommendation"
                  defaultValue = {review.get('text')}
                  onChangeText={text => {this.setState({ text });}}
                />

            {/* <View style={styles.wrapperSocialMedia}>
              <Text style={{ color: Styles.FONT_COLOR }}>Share on:</Text>
              <Image
                style={styles.imageSocial}
                source={require('../../../assets/fb_checkbox@1x.png')}
              />
            </View> */}
            {imagePlace[0] &&
              <Image
                style={{
                  width: x,
                  height: x,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                resizeMode="cover"
                source={ imageUrl }
              />
            }
          </KeyboardAvoidingView>
				</ScrollView>
        <TouchableOpacity
          style={{
            borderTopWidth: 1,
            borderColor: '#777',
          }} onPress={this.buildReview}
        >
					<Text style={styles.postBtn}>UPDATE YOUR RECOMMENDATION</Text>
				</TouchableOpacity>
			</View>
		);
  }
}
