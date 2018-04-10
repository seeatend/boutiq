import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
  ActionSheetIOS,
	View,
  Image,
	Text,
	TouchableOpacity,
} from 'react-native';
import autobind from 'autobind-decorator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'AppComponents';
import { helpers } from 'AppServices';
import { PostModel } from 'AppModels';
import { Styles, x } from 'AppStyles';

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    flexDirection: 'column',
    paddingBottom: 5,
  },
  rowWrapper: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 35,
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
  // 'Edit',
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

export class CommentsLikesBlock extends Component {
  static propTypes = {
    post: PropTypes.object,
    currentUser: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      likeButtonDisabled: false,
      alertType: null,
      alertMessage: null,
      entityLiked: props.post.get('post_liked') || false,
      likes: props.post.get('post_likes') || 0,
      isReported: props.post.get('post_is_reported'),
    };
    helpers.setAlert = helpers.setAlert.bind(this);
  }

  @autobind
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
    const { post } = this.props;
    const { isReported } = this.state;
    switch (action) {
      case 'Report':
        if (isReported) {
          post.unReport()
          .then(res => this.setState({
            isReported: true,
          }));
        } else {
          post.report()
          .then(res => this.setState({
            isReported: true,
            alertMessage: 'This post is reported',
            alertType: 'info'
          }, () => setTimeout(() => {
            this.setState({
              alertMessage: null,
              alertType: null
            });
          }, 3000)
        ))
      //   .then(res => helpers.setAlert('Post reportedddd', 'info')
          .catch(res => res);
        }
        break;
      case 'Delete':
        post.deleteReview();
        break;
      default:
    }
  }

  @autobind
  handleLike() {
    // const { handleLike, review } = this.props;
    // const { reviewLiked, likes } = this.state;
    // this.setState({
    //   likeButtonDisabled: true,
    //   reviewLiked: !reviewLiked,
    //   likes: reviewLiked ? likes - 1 : likes + 1,
    // }, () => {
    //   review
    //   .set('review_liked', this.state.reviewLiked)
    //   .set('review_likes', this.state.likes);
    // });
    // if (handleLike) {
    //   handleLike('reviews', this.props.review.get('id'), !reviewLiked)
    //   .then((res) => {
    //     PubSub.publish('updateReview', { reviewId: this.props.review.get('id'), isReviewLiked: !reviewLiked });
    //   })
    //   .catch(() => Alert.alert(
    //     'Alert Title',
    //     'A problem happened while you tried to like this place',
    //     [
    //       { text: 'OK', onPress: () => {} },
    //     ]
    //   ))
    //   .then(() => this.setState({ likeButtonDisabled: false }));
    // } else {
    //   const action = reviewLiked ? 'unlike' : 'like';
    //   Boutiq[action]({ entity: 'review', entity_id: review.get('id') })
    //   .then((res) => {
    //     PubSub.publish('updateReview', { reviewId: review.get('id'), isReviewLiked: !reviewLiked });
    //   });
    // }
  }

  @autobind
  showActionSheet() {
    const { currentUser, post } = this.props;
    // const isReported = post.get('post_is_reported');
    const { isReported } = this.state;
    const user = post.get('user');
    let buttonsToRender = BUTONS_MY_PROFILE;
    if (user.name !== currentUser.name) {
      if (isReported) {
        buttonsToRender = BUTONS_OTHER_PROFILE_UNREPORT;
      } else {
        buttonsToRender = BUTONS_OTHER_PROFILE;
      }
    }
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttonsToRender,
      cancelButtonIndex: buttonsToRender.length - 1,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'rgb(9,115,202)',
    },
    (buttonIndex) => this.handlePressToaster(buttonsToRender[buttonIndex]));
  }

  render() {
    const { post } = this.props;
    const comments = post.get('comments');
    const numberOfComments = comments.length;
    const { isReported, likeButtonDisabled } = this.state;
    return (
      <View style={styles.wrapper}>
        <Alert alertMessage={this.state.alertMessage} alertType={this.state.alertType} />
        <View style={[styles.rowWrapper, { marginTop: 10, paddingHorizontal: 15, justifyContent: 'flex-end' }]}>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              disabled={likeButtonDisabled}
              onPress={this.handleLike}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  size={22}
                  name="check"
                  color={Styles.COLOR_LIGHTER_5}
                  // color={reviewLiked ? Styles.COLOR_GREEN : Styles.COLOR_LIGHTER_5}
                />
                <Text style={[styles.rowText, { marginLeft: 5 }]}>Like</Text>
              </View>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{ flexDirection: 'row', marginRight: 90 }}>
            <Image
              source={require('../../../assets/comment_icon@1x.png')}
              style={{ width: 22, height: 18 }}
            />
            <Text style={[styles.rowText, { marginLeft: 5 }]}>Comment...</Text>
          </View> */}
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
          {/* <Text style={{ color: Styles.COLOR_DARKER_60 }}>
             likes
          </Text> */}
          {/* <Text style={{ color: Styles.COLOR_DARKER_60, marginRight: 40 }}>
            {numberOfComments} comments
          </Text> */}
          {/* <View style={{ width: 70, alignItems: 'flex-end' }}>
            {isReported &&
              <Text style={{ color: 'red' }}>
                reported
              </Text>
            }
          </View> */}
        </View>
      </View>
    );
  }
}
