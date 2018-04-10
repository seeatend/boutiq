import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { View } from 'react-native';
import {
  PlaceCard,
  PlaceReview,
  PostCard,
  PlaceTypeFilter,
  PaginatedListView,
} from 'AppComponents';
import { PostModel, ReviewModel, PlaceModel } from 'AppModels';
import { Styles } from 'AppStyles';
import { Boutiq } from 'AppServices';

export class Discover extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    latLng: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }

  constructor(props) {
    super(props);
    this.feedName = props.type === 'search' ? 'DiscoverSearch' : 'DiscoverFeed';
    this.state = {
      isMapView: false,
      tags: '',
      totalEntries: 0,
      placeData: [],
    };
    this.handleStateMapView = this.handleStateMapView.bind(this);
    this.updateTotalEntries = this.updateTotalEntries.bind(this);
    this.handleTags = this.handleTags.bind(this);
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
    return Boutiq[action]({ entity, entity_id: id })
  }

  handleTags(tags) {
    this.setState({ tags: tags.join(',') });
  }

  handleData(payload) {
    if (payload) {
      const placeData = _.map(payload, ({ place }) => {
        const { lat, lng, local, name } = place;
        return { lat, lng, local, name };
      });
      this.setState({ placeData });
    }
  }

  renderListItem(rowData) {
    const { user: currentUser, ...rest } = this.props;
    const { type } = this.props;
    if (rowData.feed_type === 'post') {
      const post = new PostModel(rowData);
      const propsPostCard = { post, currentUser, handleLike: this.handleLike, ...rowData };
      return <PostCard {...propsPostCard} />;
    }
    // warning: the day MyNetwork show "post", we need to instanciate a PostModel
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
      return <PlaceCard source="Discover" {...props} {...rowData} handleLike={this.handleLike} />;
    }
    const review = new ReviewModel(rowData);
    const props = { review, currentUser, ...rest };
    return <PlaceReview source="Discover" {...props} />;
  }

  render() {
    const { type, latLng, navigateTo } = this.props;
    const { tags, placeData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Styles.COLOR_LIGHTER_5 }}>
        {type === 'search' &&
          <PlaceTypeFilter
            totalEntries={this.state.totalEntries}
            isMapView={this.state.isMapView}
            handleStateMapView={this.handleStateMapView}
            handleTags={this.handleTags}
            feedName={this.feedName}
            placeData={placeData}
            navigateTo={navigateTo}
            source="Discover"
            handleLike={this.handleLike}
          />
        }
        <PaginatedListView
          renderListItem={(data) => this.renderListItem(data)}
          type={this.feedName}
          updateTotalEntries={this.updateTotalEntries}
          queryParams={{ tags, ...latLng }}
          handleData={this.handleData}
        />
      </View>
    );
  }
}
