import React, { Component, PropTypes } from 'react';
import {
  Navigator,
  View,
  AppState,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import { Styles } from 'AppStyles';
import {
  Menu,
  ShareActionSheet,
  Loading,
} from 'AppComponents';
/* eslint-disable */
import {
  Home,
  ReviewCreator,
  PlaceDetails,
  CommentsScene,
  ReviewEditor,
  Search,
  MemberProfileScene,
  ProfileSettingsScene,
  NotificationsScene,
  Wishlist,
  SearchResultScene
} from 'AppScenes';
/* eslint-enable */
import { BasicLayout } from 'AppLayouts';
import { tracker } from 'AppServices';
import container from './container';

export class _Main extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
    getCurrentUser: PropTypes.func,
    isNotificationFetching: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = {
      showShareActionSheet: false,
      appState: AppState.currentState,
      notifications: null,
    };
    this.openMenu = this.openMenu.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.handleShareActionSheet = this.handleShareActionSheet.bind(this);
  }

  openMenu() {
    tracker.event({ category: 'navigation', action: 'Menu' });
    this.refSideMenu.openMenu(true);
  }
  navigateTo({ verb = 'resetTo', routeId: id, ...args }) {
    const scene = args.scene.toString();
    const page = scene.substring(9, scene.indexOf('('));
    tracker.screenView({ page });
    this.refNavigator[verb]({ id, ...args });
    this.refSideMenu.openMenu(false);
  }
  handleShareActionSheet() {
    const { showShareActionSheet } = this.state;
    this.setState({
      showShareActionSheet: !showShareActionSheet
    });
  }
  renderScene({ scene, layout, ...props }, nav) {
    const commonProps = {
      navigator: nav,
      openMenu: this.openMenu,
      navigateTo: this.navigateTo,
      user: this.props.user
    };
    const children = React.createElement(scene, Object.assign(commonProps, props));
    return !layout ? children : React.createElement(layout, commonProps, children);
  }
  render() {
    const { showShareActionSheet } = this.state;
    const menu = (
      <Menu
        navigateTo={this.navigateTo}
        showShareActionSheet={showShareActionSheet}
        handleShareActionSheet={this.handleShareActionSheet}
        {...this.props}
      />
    );
    if (this.props.isNotificationFetching) {
      return (
        <Loading
          style={{ color: '#666' }}
        />
      );
    }
    return (
      <View style={{ flex: 1, }}>
        <SideMenu
          menu={menu}
          ref={c => this.refSideMenu = c}
        >
          <Navigator
            style={{
              flex: 1,
              backgroundColor: Styles.COLOR_GREEN,
            }}
            ref={c => this.refNavigator = c}
            initialRoute={{ layout: BasicLayout, scene: Home, index: 0 }}
            renderScene={this.renderScene}
            configureScene={(route) => {
              if (route.sceneConfig) { return route.sceneConfig; }
              return Navigator.SceneConfigs.FloatFromBottom;
            }}
          />
        </SideMenu>
        <ShareActionSheet
          handleShareActionSheet={this.handleShareActionSheet}
          showShareActionSheet={showShareActionSheet}
        />
      </View>
    );
  }
}

export const Main = container(_Main);
