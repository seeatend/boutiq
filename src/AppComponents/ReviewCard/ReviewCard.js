import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';

export class ReviewCard extends Component {
  static propTypes = {
    onRefresh: PropTypes.func.isRequired,
    setRefresh: PropTypes.func.isRequired,
    stopRefresh: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: true
    };
    this.props.setRefresh = this.props.setRefresh.bind(this);
    this.props.stopRefresh = this.props.stopRefresh.bind(this);
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: 'green', height: 200 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.props.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      >
        <Text>
          ReviewCard here...
        </Text>
      </ScrollView>
    );
  }
}
