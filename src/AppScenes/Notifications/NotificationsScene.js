import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Navigator,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import autobind from 'autobind-decorator';
import { PlaceModel } from 'AppModels';
import { Styles } from 'AppStyles';
import { PlaceDetails, MemberProfileScene } from 'AppScenes';
import {
  Loading,
  ProfilePhoto,
  NavBarClose,
  PageListView
} from 'AppComponents';
import { NOTIF } from './notifFixture';
import container from './container';

// const Highlight = ({ children }) => <Text>{children.toUpperCase()}</Text>;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    height: 65,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapperEmptyNotif: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class _NotificationsScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired,
    updateNotifications: PropTypes.func.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    areFetching: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { user, updateUser, fetchNotifications } = this.props;
    const payload = { ...user, unseen: 0 };
    const promises = [
      updateUser(payload),
      fetchNotifications('Notifications', { page: 1 }),
    ];
    Promise.all(promises)
    .catch(error => console.log("errrorrr", error))
  }

  @autobind
  updateTotalEntries(totalEntries) {
    this.setState({ totalEntries });
  }

  @autobind
  goToItemNotification(rowData) {
    const { link_type: linkType, link } = rowData;
    const propsToPass = linkType === 'Place'
    ? { place: new PlaceModel(link.place) }
    : { profileType: 'member', user: link.user };
    if (!rowData.read) {
      return this.props.updateNotifications('Notifications', rowData)
      .catch((error) => console.error(error))
      .then(() => this.props.navigateTo({
        verb: 'push',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        scene: linkType === 'Place' ? PlaceDetails : MemberProfileScene,
        ...propsToPass,
      }));
    }
    return this.props.navigateTo({
      verb: 'push',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      scene: linkType === 'Place' ? PlaceDetails : MemberProfileScene,
      ...propsToPass,
    });
  }

  @autobind
  renderListItem(rowData) {
    const { read, user, notification } = rowData;
    const text = notification.replace(/<(\/)?strong>/g, '');
    return (
      <TouchableOpacity
        style={[styles.cardContainer, { backgroundColor: read ? 'white' : Styles.COLOR_LIGHTER_0 }]}
        activeOpacity={0.8}
        onPress={() => {this.goToItemNotification(rowData);}}
      >
        <View style={{ flex: 1 }}>
          <ProfilePhoto
            type="circle"
            source={user.propic}
            size={40}
            border={false}
          />
        </View>
        <View style={{ flex: 4, alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 12 }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { entries } = this.props.notifications;
    if (this.props.areFetching) {
      return (
        <Loading />
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavigationBar
          title={{ title: 'YOUR ACTIVITY', style: { color: '#FFF' } }}
          tintColor={Styles.COLOR_GREEN}
          leftButton={<NavBarClose {...this.props} />}
        />
        {entries.length > 0 ?
        <PageListView
          fetchType="Notifications"
          renderListItem={this.renderListItem}
          updateTotalEntries={this.updateTotalEntries}
          fetchNotifications={this.props.fetchNotifications}
        />
        : (<View style={styles.wrapperEmptyNotif}>
          <Text style={{ textAlign: 'center' }}>
            You can manage the notifications you want to receive in your profile's settings
          </Text>
        </View>)}
      </View>
    );
  }
}
export const NotificationsScene = container(_NotificationsScene);
