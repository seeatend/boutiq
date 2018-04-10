import React, { PropTypes } from 'react';
import {
  View,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  MyNetwork,
  Discover,
} from 'AppComponents';
import { tracker } from 'AppServices';
import { styles } from './styles';

export const Home = ({ index: initialPageIndex, ...props } = { index: 0 }) => {
  tracker.event({ category: 'navigation', action: tracker.feedName(initialPageIndex) });
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapper}>
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
          <View tabLabel="My network" style={styles.tabsContent}>
            <MyNetwork type="home" {...props} />
          </View>
          <View tabLabel="Discover more" style={styles.tabsContent}>
            <Discover type="home" {...props} />
          </View>
        </ScrollableTabView>
      </View>
    </View>
  );
};

Home.propTypes = {
  index: PropTypes.number,
  navigator: PropTypes.object.isRequired,
};
