import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import PubSub from 'pubsub-js';
import { Loading } from 'AppComponents';
import { Boutiq } from 'AppServices';
import { Styles } from 'AppStyles';
import { NOTIF } from '../Mokup';
let INDEX = 1;

export class PaginatedListView extends Component {
  static propTypes = {
    renderListItem: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    type: PropTypes.string.isRequired,
    isScrollEnable: PropTypes.bool.isRequired,
    placeId: PropTypes.number,
    userId: PropTypes.number,
    massagePayload: PropTypes.func,
    updateTotalEntries: PropTypes.func,
    handleData: PropTypes.func,
    queryParams: PropTypes.object,
    getRating: PropTypes.func,
    onPageLoaded: PropTypes.func,
  }

  static defaultProps = {
    isScrollEnable: true,
    onPageLoaded: _.noop,
    renderHeader: _.noop,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isLoading: true,
      data: [],
      dataSource: this.ds.cloneWithRows([]),
      currentPage: 0,
      nextPage: 1,
      endReached: null,
      totalPageNumber: null,
      queryParams: props.queryParams,
    };
    this.type = props.type;
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.onPageLoaded = props.onPageLoaded;
    this.renderHeader = props.renderHeader;
    this.subscriptionHooks = [];
  }

  componentWillMount() {
    this.subscriptionHooks.push(PubSub.subscribe('deletedReview', (topic, reviewIdToDelete) => {
      const data = this.state.data.filter(item => item.id !== reviewIdToDelete)
      this.setState({
        data,
        dataSource: this.ds.cloneWithRows(data),
      });
    }));
    this.subscriptionHooks.push(PubSub.subscribe('createdReview', (topic, reviewCreated) => {
      const data = [reviewCreated].concat(this.state.data);
      this.setState({
        data,
        dataSource: this.ds.cloneWithRows(data),
      });
    }));
    this.subscriptionHooks.push(PubSub.subscribe('updatedReview', (topic, reviewUpdated) => {
      const review = this.state.data.find(({ id }) => id === reviewUpdated.id);
      if (review) {
          review.text = reviewUpdated.text;
          review.stars = reviewUpdated.stars;
          const data = this.state.data.concat([]);
          this.setState({
            data,
            dataSource: this.ds.cloneWithRows(data),
          });
        }
    }));
    this.subscriptionHooks.push(PubSub.subscribe('createdPost', (topic, postCreated) => {
      const data = [postCreated].concat(this.state.data);
      this.setState({
        data,
        dataSource: this.ds.cloneWithRows(data),
      });
    }));
    this.subscriptionHooks.push(
      PubSub.subscribe('updatePlace', (topic, { placeId, isPlaceLiked }
    ) => {
        const review = this.state.data.find(r => r && r.place && r.place.id === placeId);
        if (review && review.place) {
          review.place.place_liked = isPlaceLiked;
          const data = this.state.data.concat([]);
          this.setState({
            data,
            dataSource: this.ds.cloneWithRows(data),
          });
        }
      }));
    this.subscriptionHooks.push(PubSub.subscribe(
      'updateReview', (topic, { reviewId, isReviewLiked, likes }
      ) => {
        const review = this.state.data.find(({ id }) => id === reviewId);
        if (review) {
          review.review_liked = isReviewLiked;
          review.review_likes = likes;
          const data = this.state.data.concat([]);
          this.setState({
            data,
            dataSource: this.ds.cloneWithRows(data),
          });
        }
      }));
    this.subscriptionHooks.push(PubSub.subscribe(
      'blockUser', (topic, { userId }
      ) => {
        const data = this.state.data.filter(({ user }) => user.id !== userId);
        this.setState({
          data,
          dataSource: this.ds.cloneWithRows(data),
        });
      }));
  }

  componentDidMount() {
    if (this.type !== 'Notifications') {
      this.loadPage.call(this, this.type);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.queryParams, this.props.queryParams)) {
      this.state = {
        currentPage: 0,
        data: [],
        nextPage: 1,
        endReached: null,
        totalPageNumber: null,
        dataSource: this.ds.cloneWithRows([]),
        queryParams: nextProps.queryParams,
      };
      this.loadPage.call(this, this.type);
    }
  }

  componentWillUnmount() {
    this.subscriptionHooks.forEach(hook => PubSub.unsubscribe(hook));
  }

  onEndReached() {
    const { endReached } = this.state;
    if (!endReached) {
      this.loadPage.call(this, this.type);
    }
  }

  loadPage(type) {
    if (this.state.endReached === true) {
      return;
    }
    const { massagePayload, userId, placeId, getRating } = this.props;
    const params = {
      page: this.state.nextPage,
      ...this.state.queryParams
    };
    if (placeId) {
      params.placeId = placeId;
    }
    if (userId) {
      params.userId = userId;
    }
    Boutiq[`get${type}`](params)
    .then((payload) => {
      if (_.isEmpty(payload)) {
        return this.setState({
          isLoading: false,
          endReached: true,
          data: [{ message: 'not availabe' }],
          dataSource: this.ds.cloneWithRows([{ message: 'not availabe' }]),
        });
      }
      const { avg_rating: avgRating, other_avg_rating: otherAvgRating } = payload;
      getRating && getRating(avgRating, otherAvgRating);
      const {
        current_page: currentPage,
        entries,
        total_entries: totalEntries,
        per_page: perPage,
      } = massagePayload ? massagePayload(payload) : payload;
      const data = this.state.data.concat(entries);
      const totalPageNumber = Math.ceil(totalEntries / perPage);
      const endReached = currentPage >= totalPageNumber;
      this.setState({
        isLoading: false,
        currentPage,
        nextPage: currentPage + 1,
        endReached,
        totalPageNumber,
        data,
        dataSource: this.ds.cloneWithRows(data),
      }, () => {
        this.onPageLoaded(this.state);
      });
      if (currentPage === 1 && this.props.updateTotalEntries) {
        this.props.updateTotalEntries(totalEntries);
      }
      if (currentPage === 1 && this.props.handleData) {
        this.props.handleData(data);
      }
    });
  }

  renderFooter() {
    const { endReached } = this.state;
    if (endReached) {
      return (
        <Text style={{
          padding: 10,
          paddingBottom: 20,
          textAlign: 'center',
        }}
        >
          For more results, switch over to "Discover more" or try a more specific location
        </Text>
      );
    }
    return <ActivityIndicator style={{ padding: 15, marginBottom: 20, }} />;
  }


  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading style={{ color: '#666' }}>
          <Text style={{ color: '#666' }}>Loading feed...</Text>
        </Loading>
      );
    }
    return (
      <ListView
        style={{ backgroundColor: Styles.COLOR_LIGHTER_5 }}
        scrollEnabled={this.props.isScrollEnable}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderHeader={this.renderHeader}
        renderRow={(rowData) => this.props.renderListItem(rowData)}
        onEndReached={this.onEndReached}
        renderFooter={this.renderFooter}
        {...this.props}
      />
    );
  }
}
