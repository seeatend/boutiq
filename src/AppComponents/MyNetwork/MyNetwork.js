import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import PubSub from 'pubsub-js';
import _ from 'lodash';
import {
  PlaceCard,
  PlaceReview,
  PostStatus,
  PostCard,
  Loading,
  Alert,
  PlaceTypeFilter,
  PaginatedListView,
} from 'AppComponents';
import { Styles } from 'AppStyles';
import { PostModel, ReviewModel, PlaceModel } from 'AppModels';
import { Boutiq } from 'AppServices';

export class MyNetwork extends Component {
  static propTypes = {
    user: PropTypes.object,
    navigateTo: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['home', 'search']),
    latLng: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.feedName = props.type === 'search' ? 'MyNetworkSearch' : 'MyNetworkFeed';
    this.state = {
      isLoading: false,
      isMapView: false,
      tags: '',
      status: '',
      placeData: [],
      totalEntries: 0,
      alertMessage: null,
      alertType: null,
      postToConcat: null,
    };
    this.handleStateMapView = this.handleStateMapView.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.updateTotalEntries = this.updateTotalEntries.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleStateMapView() {
    const { isMapView } = this.state;
    this.setState({
      isMapView: !isMapView
    });
  }

  updateTotalEntries(totalEntries) {
    this.setState({ totalEntries });
  }

  handleLike(entity, id, isLiked = false) {
    const action = isLiked ? 'like' : 'unlike';
    return Boutiq[action]({ entity, entity_id: id });
  }

  handleTags(tags) {
    this.setState({ tags: tags.join(',') });
  }

  handleStatus() {
    if (this.refStatus.state.text === '') {
      return this.setState({
        alertMessage: 'A post cannot be empty',
        alertType: 'warning'
      }, () => setTimeout(() => {
        this.setState({
          alertMessage: null,
          alertType: null
        });
      }, 3000)
      );
    }
    const postStatus = new PostModel({ status: this.refStatus.state.text });

    postStatus.create()
    .then(payload => {
      this.refStatus.setState({ text: '' });
      const payloadFeedType = Object.assign(payload.props, { feed_type: 'post' });
      PubSub.publish('createdPost', payloadFeedType);
    })
    .catch(() => {
      return this.setState({
        alertMessage: 'An error happens while creating a post',
        alertType: 'error'
      }, () => setTimeout(() => {
        this.setState({
          alertMessage: null,
          alertType: null
        });
      }, 3000));
    });
  }

  handleData(payload) {
    if (payload) {
      const placeData = _.map(payload, ({ place }) => {
        if (place) {
          const { lat, lng, local, name } = place;
          return { lat, lng, local, name };
        }
        return {};
      });
      this.setState({ placeData });
    }
  }

  renderListItem(rowData) {
    const { user: currentUser, ...rest } = this.props;
    const { type, navigateTo } = this.props;
    if (rowData.feed_type === 'post') {
      const post = new PostModel(rowData);
      const propsPostCard = {
        post, currentUser, navigateTo, ...rowData
      };
      return <PostCard {...propsPostCard} />;
    }

    if (type === 'search') {
      const extra = _.pick(rowData, [
        'place_liked',
        'best_rated_pictures',
        'friends_avg',
        'friends_avg_count',
        'recommended_users_avatar',
        'likes',
        'is_reported'
      ]);
      const place = new PlaceModel(Object.assign(rowData.place, extra));
      const props = { place, currentUser, ...rest };
      return <PlaceCard source="MyNetwork" {...props} {...rowData} handleLike={this.handleLike} />;
    }
    const review = new ReviewModel(rowData);
    const props = { review, currentUser, ...rest };
    return <PlaceReview source="MyNetwork" {...props} {...rowData} />;
  }

  render() {
    const { type, latLng, navigateTo } = this.props;
    const { alertMessage, alertType, isMapView, tags, placeData, isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <View style={{ flex: 1, backgroundColor: Styles.COLOR_LIGHTER_5 }}>
        <Alert alertMessage={alertMessage} alertType={alertType} />
        <PaginatedListView
          renderHeader={() => {
            return type === 'search' ?
              <PlaceTypeFilter
                totalEntries={this.state.totalEntries}
                isMapView={isMapView}
                handleStateMapView={this.handleStateMapView}
                feedName={this.feedName}
                handleTags={this.handleTags}
                placeData={placeData}
                navigateTo={navigateTo}
                source="MyNetwork"
                handleLike={this.handleLike}
              />
            :
            <View />;
              // <PostStatus
              //   user={user}
              //   onPress={() => this.handleStatus()}
              //   ref={text => this.refStatus = text}
              // />
          }}
          renderListItem={(data) => this.renderListItem(data)}
          updateTotalEntries={this.updateTotalEntries}
          queryParams={{ tags, ...latLng }}
          handleData={this.handleData}
          type={this.feedName}
        />
      </View>
    );
  }
}
