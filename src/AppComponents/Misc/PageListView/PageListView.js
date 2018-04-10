import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import _ from 'lodash';
import { Styles, x } from 'AppStyles';
import container from './container';
// import { NOTIF } from '../../Mokup';

const styles = StyleSheet.create({
  wrapperEmptyNotif: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: x,
    backgroundColor: Styles.COLOR_LIGHTER_5
  }
});

class _PageListView extends Component {
  static propTypes = {
    fetchType: PropTypes.string.isRequired,
    renderListItem: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    fetcher: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    // updateTotalEntries: PropTypes.func,
  }

  static defaultProps = {
    isScrollEnable: true,
    onPageLoaded: _.noop,
    renderHeader: _.noop,
  }

  constructor(props) {
    const {
      entries,
    } = props.data;
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows(entries),
      refreshing: false
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderHeader = props.renderHeader;
  }

  componentWillReceiveProps(nextProps) {
    const { entries } = nextProps.data;
    this.setState({
      dataSource: this.ds.cloneWithRows(entries),
    });
  }

  onEndReached() {
    const { endReached } = this.props.data;
    const { current_page: currentPage } = this.props.data;
    const { fetchType } = this.props;
    if (!endReached) {
      const params = { page: currentPage + 1 };
      this.props.fetcher(fetchType, params);
    }
    return null;
  }

  onRefresh() {
    const { fetcher, fetchType } = this.props;
    this.setState({ refreshing: true });
    fetcher(fetchType)
    .catch(error => console.error('Error: ', error))
    .then(() => this.setState({ refreshing: false }))
  }

  renderSeparator(sectionID: number, rowID: number) {
    return <View key={`${sectionID}-${rowID}`} style={styles.separator} />;
  }

  renderFooter() {
    const { endReached } = this.props.data;
    if (endReached) {
      return (
        <View style={[styles.separator, { backgroundColor: Styles.COLOR_GREEN }]} />
      );
    }
    return <ActivityIndicator style={{ padding: 15, marginBottom: 20 }} />;
  }

  render() {
    const { entries } = this.props.data;
    const { fetchType } = this.props;
    if (entries.length === 0 && fetchType === 'Notifications') {
      return (
        <View style={styles.wrapperEmptyNotif}>
          <Text>
            You can manage the notifications you want to receive in Settings
          </Text>
        </View>
      );
    }
    return (
      <ListView
        style={{ backgroundColor: Styles.COLOR_WHITE, flex: 1 }}
        removeClippedSubviews={false}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={(rowData) => this.props.renderListItem(rowData)}
        renderSeparator={this.renderSeparator}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0}
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      />
    );
  }
}

export const PageListView = container(_PageListView);
