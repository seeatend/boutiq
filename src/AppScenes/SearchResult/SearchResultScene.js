import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  Discover,
  MyNetwork,
  NavBarClose,
} from 'AppComponents';
import { Styles } from 'AppStyles';
import { tracker } from 'AppServices';

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: Styles.COLOR_GREEN,
  },
});

export class SearchResultScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    placeTitle: PropTypes.string,
  }
  static defaultProps = {
    placeTitle: 'SEARCH RESULT',
    latLng: {
      lat: -33.8688197,
      lng: 151.2092955,
    }
  }

  render() {
    const { placeTitle } = this.props;
    const initialPageIndex = 0;
    tracker.event({ category: 'navigation', action: tracker.feedName(initialPageIndex) });
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavigationBar
          tintColor={Styles.COLOR_GREEN}
          title={{ title: placeTitle && placeTitle.toUpperCase(), style: Styles.NAVBAR }}
          leftButton={<NavBarClose iconName="chevron-left" {...this.props} />}
        />
        <ScrollableTabView
          initialPage={initialPageIndex}
          tabBarActiveTextColor="#fff"
          tabBarInactiveTextColor="#fff"
          tabBarUnderlineStyle={{ height: 5, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          style={styles.tabs}
          onChangeTab={({ i }) => {
            tracker.event({ category: 'navigation', action: tracker.feedName(i) });
          }}
        >
          <MyNetwork
            tabLabel="My network"
            type="search"
            {...this.props}
          />
          <Discover
            tabLabel="Discover more"
            type="search"
            {...this.props}
          />
        </ScrollableTabView>
      </View>
    );
  }
}
