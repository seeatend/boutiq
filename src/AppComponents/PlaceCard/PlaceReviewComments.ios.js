import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
  ActionSheetIOS,
	View,
  Image,
  Alert,
	Text,
  Navigator,
	TouchableOpacity,
} from 'react-native';
import autobind from 'autobind-decorator';
import PubSub from 'pubsub-js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommentsScene, LikesScene, ReviewEditor } from 'AppScenes';
import { ReviewModel } from 'AppModels';
import { Styles, x } from 'AppStyles';
import { tracker, Boutiq } from 'AppServices';

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    flexDirection: 'column',
    paddingBottom: 5,
  },
  rowWrapper: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    alignSelf: 'center',
    width: x - 30,
    height: 1,
    backgroundColor: Styles.COLOR_LIGHTER_5,
  },
  rowText: {
    color: Styles.FONT_COLOR,
  },
});

const BUTONS_MY_PROFILE = [
  'Delete',
  'Edit',
  'Cancel',
];
const BUTONS_OTHER_PROFILE = [
  'Report', 'Cancel'
];
const BUTONS_OTHER_PROFILE_UNREPORT = [
  'Unreport', 'Cancel'
];

const DESTRUCTIVE_INDEX = 0;
// const CANCEL_INDEX = BUTTONS.length - 1;

export class PlaceReviewComments extends Component {
  static propTypes = {
    review: PropTypes.shape(ReviewModel.schema),
    currentUser: PropTypes.object.isRequired,
    handleLike: PropTypes.func,
    navigateTo: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      likeButtonDisabled: false,
      reviewLiked: props.review.get('review_liked') || false,
      likes: props.review.get('review_likes') || 0
    };
    this.toggleSelection = this.toggleSelection.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.goToCommentsScene = this.goToCommentsScene.bind(this);
    this.goToReviewEditor = this.goToReviewEditor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { review } = nextProps;
    this.setState({
      reviewLiked: review.get('review_liked'),
      likes: review.get('review_likes'),
    });
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
    const { review, navigateTo } = this.props;
    const { is_reported: isReported } = review.props;
    switch (action) {
      case 'Report':
        if (isReported) {
          review.unReport();
        } else {
          review.report();
        }
        break;
      case 'Delete':
        review.deleteReview()
        .then(res => PubSub.publish('deletedReview', res.id))
        .catch(() => Alert.alert(
          'Alert Title',
          'A problem happened while you tried to delete this review',
          [
            { text: 'OK', onPress: () => {} },
          ]
        ));
        break;
      case 'Edit':
        this.goToReviewEditor();
        break;
      default:
    }
  }

  showActionSheet() {
    const { currentUser, review } = this.props;
    const { is_reported: isReported } = review.props;
    const user = review.get('user');
    let buttonsToRender = BUTONS_MY_PROFILE;
    if (user.name !== currentUser.name) {
      if (isReported) {
        buttonsToRender = BUTONS_OTHER_PROFILE_UNREPORT;
      } else {
        buttonsToRender = BUTONS_OTHER_PROFILE;
      }
    }
    tracker.event({ category: 'actionsheet', action: 'show' });
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttonsToRender,
      cancelButtonIndex: buttonsToRender.length - 1,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'rgb(9,115,202)',
    },
    (buttonIndex) => this.handlePressToaster(buttonsToRender[buttonIndex]));
  }

  @autobind
  handleLike() {
    const { review } = this.props;
    const { reviewLiked, likes } = this.state;
    this.setState({
      likeButtonDisabled: true,
      reviewLiked: !reviewLiked,
      likes: reviewLiked ? likes - 1 : likes + 1,
    }, () => {
      review
      .set('review_liked', this.state.reviewLiked)
      .set('review_likes', this.state.likes);
    });
    const action = reviewLiked ? 'unlike' : 'like';
    Boutiq[action]({ entity: 'review', entity_id: review.get('id') })
    .then(() => {
      const newLikesCount = reviewLiked ? likes - 1 : likes + 1;
      PubSub.publish('updateReview', {
        reviewId: review.get('id'),
        isReviewLiked: !reviewLiked,
        likes: newLikesCount
      })
      .catch(() => Alert.alert(
        'Alert Title',
        'A problem happened while you tried to like this place',
        [
          { text: 'OK', onPress: () => this.setState({ likeButtonDisabled: false }) },
        ]
      ))
      .then(() => this.setState({ likeButtonDisabled: false }));
    })
    .catch(() => this.setState({ likeButtonDisabled: false }));
  }

  goToReviewEditor() {
    const { currentUser, review } = this.props;
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: ReviewEditor,
      review
    });
  }

  goToCommentsScene() {
    const { currentUser, review } = this.props;
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: CommentsScene,
      currentUser,
      data: review
    });
  }

  @autobind
  goToLikesScene() {
    const { review, navigateTo } = this.props;
    navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: LikesScene,
      contactType: 'likes',
      reviewId: review.get('id'),
      userId: review.get('user').id,
      navigateTo
    });
  }

  render() {
    const { review } = this.props;
    const comments = review.get('comments');
    const numberOfComments = comments.length;
    const isReported = review.get('is_reported');
    const { likes, reviewLiked, likeButtonDisabled } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={[styles.rowWrapper, { marginTop: 10, paddingHorizontal: 15 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              disabled={likeButtonDisabled}
              onPress={this.handleLike}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  size={22}
                  name="check"
                  color={reviewLiked ? Styles.COLOR_GREEN : Styles.COLOR_LIGHTER_5}
                />
                <Text style={[styles.rowText, { marginLeft: 5 }]}>Like</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            onPress={this.goToCommentsScene}
            style={{ flexDirection: 'row', marginRight: 90 }}
          >
            <Image
              source={require('../../../assets/comment_icon@1x.png')}
              style={{ width: 22, height: 18 }}
            />
            <Text style={[styles.rowText, { marginLeft: 5 }]}>Comment...</Text>
          </TouchableOpacity> */}
          <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={[styles.button, { width: 45 }]}
              onPress={this.showActionSheet}
            >
              <Icon
                size={20}
                name="ellipsis-h"
                color={Styles.COLOR_DARKER_15}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={[styles.rowWrapper, { paddingHorizontal: 15 }]}>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={this.goToLikesScene}
          >
            <Text style={{ color: Styles.COLOR_DARKER_60 }}>
              {likes} likes
            </Text>
          </TouchableOpacity>
          {/* <Text style={{ color: Styles.COLOR_DARKER_60, marginRight: 40 }}>
            {numberOfComments} comments
          </Text> */}
          <View style={{ width: 70, alignItems: 'flex-end' }} />
        </View>
      </View>
    );
  }
}
