import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  ToastAndroid,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Styles, x } from 'AppStyles';
import { ReviewModel } from 'AppModels';
import { tracker } from 'AppServices';
import { ReviewEditor } from 'AppScenes';
import { ReviewModel } from 'AppModels';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  rowWrapper: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    color: Styles.FONT_COLOR,
  },
});

const BUTTONSMYPROFILE = [
  'Delete',
  'Edit',
  'Cancel',
];
const BUTTONSOTHERPROFILE = [
  'Report',
  'Cancel',
];
const DESTRUCTIVE_INDEX = 0;
// const CANCEL_INDEX = BUTTONS.length - 1;

export class PlaceReviewComments extends Component {
  static propTypes = {
    review: PropTypes.shape(ReviewModel.schema),
    currentUser: PropTypes.object.isRequired,
    user: PropTypes.object,
    navigateTo: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      reviewLiked: props.review.get('review_liked') || false,
      likes: props.review.get('review_likes') || 0
    };
    this.toggleSelection = this.toggleSelection.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.goToReviewEditor = this.goToReviewEditor.bind(this);
  }

  toggleSelection() {
    const reviewLiked = this.state.reviewLiked;
    let likes = this.state.likes;

    if (reviewLiked) {
      this.props.review.unlike();
      likes -= 1;
    } else {
      this.props.review.like();
      likes += 1;
    }
    this.setState({
      reviewLiked: !reviewLiked,
      likes
    });
  }

  handlePressToaster(action) {
    const { review } = this.props;
    const { is_reported: isReported } = review.props;
    switch (action) {
      case 'Report':
        if (isReported) {
          review.props.unReport();
        } else {
          review.props.report();
        }
        break;
      case 'Delete':
        review.deleteReview();
        break;
      case 'Edit':
        this.goToReviewEditor();
        break;
      default:
    }
  }

  showActionSheet = () => {
    const { user, currentUser } = this.props;
    const buttonsToRender = user.name === currentUser.name ? BUTTONSMYPROFILE : BUTTONSOTHERPROFILE;
    tracker.event({ category: 'actionsheet', action: 'show' });
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttonsToRender,
      cancelButtonIndex: buttonsToRender.length - 1,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'rgb(9,115,202)',
    },
    (buttonIndex) => this.handlePressToaster(buttonsToRender[buttonIndex]));
  };

  goToReviewEditor() {
    const { currentUser, review } = this.props;
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: ReviewEditor,
      data: review
    });
  }
  
  render() {
    const { review } = this.props;
    const comments = review.get('comments');
    const numberOfComments = comments.length;
    const isReported = review.get('is_reported');
    const { likes, reviewLiked } = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={[styles.rowWrapper, { marginTop: 10 }]}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.toggleSelection}>
              <Icon
                size={22}
                name="check"
                color={reviewLiked ? Styles.COLOR_GREEN : Styles.COLOR_LIGHTER_5}
              />
            </TouchableOpacity>
            <Text style={[styles.rowText, { marginLeft: 5 }]}>Like</Text>
          </View>
          <View style={{ flexDirection: 'row', marginRight: 90 }}>
            <Image
              source={require('../../../assets/comment_icon@1x.png')}
              style={{ width: 22, height: 18 }}
            />
          <Text style={[styles.rowText, { marginLeft: 5 }]}>Comment...</Text>
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() =>
              ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT)}>
              <Icon
                size={20}
                name="ellipsis-h"
                color={Styles.COLOR_DARKER_15}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: x - 30, height: 1, backgroundColor: Styles.COLOR_LIGHTER_5, }} />
        <View style={[styles.rowWrapper, { justifyContent: 'flex-start' }]}>
          <Text style={{ color: Styles.COLOR_DARKER_60 }}>
            {likes} likes
          </Text>
          <Text style={{ color: Styles.COLOR_DARKER_60, marginRight: 40, marginLeft: 10 }}>
            {numberOfComments} comments
          </Text>
          <View style={{ width: 70, alignItems: 'flex-end' }}>
            {isReported &&
              <Text style={{ color: 'red' }}>
                reported
              </Text>
            }
          </View>
        </View>
      </View>
    );
  }
}
