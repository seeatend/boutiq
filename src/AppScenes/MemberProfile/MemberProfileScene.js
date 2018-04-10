import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActionSheetIOS,
  Navigator,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import PubSub from 'pubsub-js';
import autobind from 'autobind-decorator';
import { ProfileSettingsScene } from 'AppScenes';
import {
  Profile,
  PlaceReview,
  PaginatedListView,
  ShareActionSheet,
  Loading,
  ModalMessage
} from 'AppComponents';
import { UserModel, ReviewModel } from 'AppModels';
import { x, y, Styles } from 'AppStyles';
import { Boutiq, User } from 'AppServices';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Styles.COLOR_LIGHTER_5
  },
  navigation: {
    height: 45,
    borderBottomWidth: 2,
    borderColor: Styles.COLOR_DARKER_30
  },
  optionButton: {
    height: 45,
    justifyContent: 'center',
    marginRight: 15
  },
  viewContentNotAvailable: {
    height: y / 2.1,
    width: x,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbarRightImage: {
    padding: 2,
    height: 20,
    width: 20,
    backgroundColor: Styles.COLOR_WHITE
  }
});

const BUTTONS = [
  'Block User',
  // 'Report',
  'Cancel',
];
const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = BUTTONS.length - 1;

export class MemberProfileScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    handleLike: PropTypes.func,
    user: PropTypes.object.isRequired,
    profileType: PropTypes.string.isRequired,
    showNavBar: PropTypes.bool
  }
  static defaultProps = {
    showNavBar: true
  }
  constructor(props) {
    super(props);
    this.user = new UserModel(props.user);
    this.state = {
      isMyProfile: null,
      showModal: false,
      disabledButton: false,
      follow: this.user.getFollowState(),
      profile: null,
      feedAvailable: null,
      isLoadingProfile: true,
      isLoadingReviews: true,
      showShareActionSheet: false,
    };
    this.handleShareActionSheet = this.handleShareActionSheet.bind(this);
  }

  componentDidMount() {
    User.get()
    .then(currentUser => {
      this.setState({
        currentUser,
        isMyProfile: this.props.user.name === currentUser.name,
      });

      Boutiq.getProfile(this.props.user.id)
      .then(profile => {
        if (this.state.isMyProfile) {
          User.set(profile);
        }
        this.setState({
          isLoadingProfile: false,
          profile,
          feedAvailable: profile.public || profile.isFriend
        });
      });
    });
  }

  handleShareActionSheet() {
    const { showShareActionSheet } = this.state;
    this.setState({
      showShareActionSheet: !showShareActionSheet
    });
  }

  handlePressToaster(action) {
    switch (action) {
      // case 'Block User':
      //   if (isReported) {
      //     review.unReport();
      //   } else {
      //     review.report();
      //   }
      //   break;
      case 'Block User':
        this.setState({
          showModal: true
        });
        break;
      default:
    }
  }

  @autobind
  updateTotalEntries(totalEntries) {
    this.setState({ totalEntries });
  }

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'rgb(9,115,202)',
    },
    (buttonIndex) => this.handlePressToaster(BUTTONS[buttonIndex]));
  }

  @autobind
  handleModal(cb = _.noop) {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal
    }, cb);
  }

  @autobind
  blockUser() {
    this.setState({
      disabledButton: true
    });
    this.user.block()
    .then(res => {
      this.handleModal(() => {
        this.props.navigator.pop();
        PubSub.publish('blockUser', { userId: res.user_id });
      });
    })
    .catch(() => Alert.alert(
      'Warning',
      'Sorry, something went wrong',
      [
        { text: 'OK', onPress: () => {} },
      ]
    ));
  }

  @autobind
  renderListItem(rowData) {
    if (rowData.message) {
      return (
      <View style={styles.viewContentNotAvailable}>
        <Text>
          This user is private. You will soon be able to request to follow them
        </Text>
      </View>
    );
    }
    const { user, ...rest } = this.props;
    const { currentUser } = this.state;
    const review = new ReviewModel(rowData);
    const props = { ...rest, review, currentUser, isProfilePressable: false };
    return <PlaceReview source="MyNetwork" {...props} />;
  }

  renderModalConfirmBlock() {
    const buttons = [
      {
        title: 'Block user',
        action: () => this.blockUser(),
        disabled: this.state.disabledButton
      },
      {
        title: 'Cancel',
        action: () => this.handleModal(),
        disabled: this.state.disabledButton
      },
    ];
    if (this.state.showModal) {
      return (
        <ModalMessage
          messageCore="By blocking this user, you will not see their content and they will not see your content anymore"
          buttons={buttons}
          onClose={() => this.handleModal()}
          icon={require('../../../assets/Boutiq_logo_round.png')}
        />
      );
    }
    return null;
  }

  @autobind
  goToProfileSettings() {
    this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: ProfileSettingsScene,
    });
  }

  render() {
    const { profile, follow, isMyProfile, isLoadingProfile,
      currentUser, showShareActionSheet } = this.state;
    if (isLoadingProfile) {
      return (
        <Loading>
          <Text style={{ color: '#fff' }}>Loading profile...</Text>
        </Loading>
      );
    }
    const { navigator, navigateTo, profileType, showNavBar } = this.props;
    const leftButtonConfig = {
      title: 'Close',
      tintColor: Styles.COLOR_DARKER_30,
      handler: () => this.props.navigator.pop(),
    };
    if (!profile || !currentUser) {
      return null;
    }
    return (
      <View style={styles.wrapper}>
        {
          showNavBar &&
          <NavigationBar
            style={styles.navigation}
            tintColor="#fff"
            leftButton={leftButtonConfig}
            rightButton={profileType === 'member'
            ?
              (<TouchableOpacity
                onPress={() => this.showActionSheet()}
                style={styles.optionButton}
              >
                <Icon size={20} name="ellipsis-h" color={Styles.COLOR_DARKER_30} />
              </TouchableOpacity>)
            : (<TouchableOpacity
              onPress={() => this.goToProfileSettings()}
              style={styles.optionButton}
            >
                <Image
                  source={require('../../../assets/Settings_icon.png')}
                  style={styles.navbarRightImage}
                />
              </TouchableOpacity>)
              }
          />
        }
        <PaginatedListView
          renderHeader={() => (
            <Profile
              handleProfileStatus={this.handleProfileStatus}
              handleShareActionSheet={this.handleShareActionSheet}
              profileType={this.props.profileType}
              user={this.props.user}
              profile={profile}
              follow={follow}
              isMyProfile={isMyProfile}
              navigator={navigator}
              navigateTo={navigateTo}
            />
          )}
          renderListItem={(data) => this.renderListItem(data)}
          updateTotalEntries={(data) => this.updateTotalEntries(data)}
          userId={this.props.user.id}
          type="ProfileFeed"
        />
        {this.renderModalConfirmBlock()}
        <ShareActionSheet
          handleShareActionSheet={this.handleShareActionSheet}
          showShareActionSheet={showShareActionSheet}
        />
      </View>
    );
  }
}
