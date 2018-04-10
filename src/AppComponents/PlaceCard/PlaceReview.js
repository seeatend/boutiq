import React, { PropTypes, Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
  TouchableHighlight,
	TouchableWithoutFeedback,
  Navigator,
} from 'react-native';
import autobind from 'autobind-decorator';
import { ReviewModel } from 'AppModels';
import { PlaceDetails, MemberProfileScene } from 'AppScenes';
import { Styles, x } from 'AppStyles';
import { ProfileName } from './ProfileName';
import { PlaceReviewComments } from './PlaceReviewComments';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    backgroundColor: Styles.COLOR_WHITE,
  },
  image: {
    width: x,
    height: x,
  },
  postReviewText: {
    padding: 15,
    backgroundColor: 'white',
    fontSize: Styles.FONT_SIZE_MEDIUM,
    color: Styles.FONT_COLOR,
  },
});

export class PlaceReview extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    isProfilePressable: PropTypes.bool,
    isPlacePressable: PropTypes.bool,
    source: PropTypes.string.isRequired,
    review: PropTypes.shape(ReviewModel.schema),
    handleLike: PropTypes.func,
  }
  static defaultProps = {
    isProfilePressable: true,
    isPlacePressable: true
  }
  constructor(props) {
    super(props);
    this.state = {
      fullDescView: false,
      disabledButton: props.review.get('text').length <= 60,
    };
  }

  @autobind
  handleViewSizeDesc() {
    const { fullDescView } = this.state;
    if (!fullDescView) {
      this.setState({
        fullDescView: !fullDescView
      });
    } else if (this.props.isPlacePressable) {
      this.handlePress(this.props);
    }
  }

  handlePress({ navigateTo, source, review, handleLike }) {
    navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: PlaceDetails,
      source,
      review,
      handleLike
    });
  }

  goToReviewUserProfile(navigateTo, review, currentUser) {
    navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: MemberProfileScene,
      handleLike: this.props.handleLike,
      user: review.get('user'),
      profileType: currentUser.name === review.get('user').name ? 'my profile' : 'member'
    });
  }

  renderPhoto() {
    const { navigateTo, review, source, isPlacePressable, handleLike } = this.props;
    const pictures = review.get('pictures');
    const uri = pictures && pictures[0] && pictures[0].image.url;
    if (!uri) {
      return <View />;
    }
    return (
      <TouchableHighlight
        disabled={!isPlacePressable}
        underlayColor="transparent"
        onPress={() => this.handlePress({ navigateTo, source, review, handleLike })}
      >
        <Image
          source={{ uri }}
          style={styles.image}
        />
      </TouchableHighlight>
    );
  }

  renderTextReview(text) {
    const { fullDescView } = this.state;
    let troncate = false;
    if (!fullDescView && text.length > 60) {
      troncate = true;
    }
    return (
      <TouchableWithoutFeedback
        disabled={this.state.disabledButton}
        onPress={this.handleViewSizeDesc}
      >
        <View>
          <Text style={styles.postReviewText}>
            {!troncate && text}
            {troncate && text.slice(0, 70)}
            <Text style={{ fontSize: Styles.FONT_SIZE }}>{troncate && ' ...more'}</Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { navigateTo, review, source, currentUser, isProfilePressable, handleLike } = this.props;
    return (
      <View style={styles.wrapper}>
        <ProfileName
          isMyProfile={currentUser.id === review.get('user').id}
          {...review.props}
          follow={false}
          goToReviewUserProfile={() => this.goToReviewUserProfile(navigateTo, review, currentUser)}
          goToPlaceDetails={() => this.handlePress({ navigateTo, source, review, handleLike })}
          isProfilePressable={isProfilePressable}
        />
        {this.renderTextReview(review.get('text'))}
        {this.renderPhoto()}
        <PlaceReviewComments
          navigateTo={navigateTo}
          review={review}
          currentUser={currentUser}
          handleLike={handleLike}
        />
      </View>
    );
  }
}
