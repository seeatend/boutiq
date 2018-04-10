import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  Alert,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { PlaceCard, Tags, Loading } from 'AppComponents';
import { Styles, x } from 'AppStyles';
import { Boutiq } from 'AppServices';
import { PlaceModel } from 'AppModels';
import _ from 'lodash';
let INDEX = 0;

const styles = StyleSheet.create({
  wrapperTags: {
    height: 80,
    width: x,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
  }
});

export class Wishlist extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
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
      tags: [],
      loadingText: null
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.filter = this.filter.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  componentDidMount() {
    this.loadPage.call(this);
  }

  onEndReached() {
    this.filter(this.state.tags, this.state.nextPage, this.state.data);
  }

  filter(tags, nextPage = 1, currentData = []) {
    Boutiq.getWishlist({ page: nextPage, user_id: this.props.user.id, tags: tags.join(',') })
    .then(({ current_page: currentPage, entries }) => {
      const data = currentData.concat(entries);
      this.setState({
        isLoading: false,
        currentPage,
        nextPage: currentPage + 1,
        data,
        dataSource: this.ds.cloneWithRows(data),
      });
    });
  }

  loadPage() {
    const { tags, nextPage, data } = this.state;
    this.filter(tags, nextPage, data);
  }

  handleTags(tags) {
    this.setState({ tags, isLoading: true, loadingText: 'Filtering Saved Places...' });
    this.filter(tags);
  }

  handleLike(entity, placeId, isLiked = false) {
    const { data } = this.state;
    const action = isLiked ? 'like' : 'unlike';
    const newData = data.filter(d => d.place.id !== placeId);
    this.setState({
      data: newData,
      dataSource: this.ds.cloneWithRows(newData)
    });
    return Boutiq[action]({ entity, entity_id: placeId })
    .then(() => {})
    .catch(() => Alert.alert(
      'Warning',
      'Sorry, something went wrong',
      [
        { text: 'OK', onPress: () => {} },
      ]
    ));
  }

  renderListItem(rowData) {
    const extra = _.pick(rowData, [
      'place_liked',
      'best_rated_pictures',
      // 'friends_avg',
      // 'friends_avg_count',
      'recommended_users_avatar',
      'likes',
      'is_reported'
    ]);
    const { user: currentUser, ...rest } = this.props;
    const place = new PlaceModel(Object.assign(rowData.place, extra));
    const props = { place, currentUser, ...rest };
    return (
      <PlaceCard
        {...props}
        {...rowData}
        lastReviewProfiles={false}
        handleLike={this.handleLike}
      />
    );
  }

  render() {
    const { isLoading, data, dataSource, loadingText } = this.state;
    const text = loadingText || 'Loading Saved Places...';
    return (
      <View style={{ flex: 1, backgroundColor: Styles.COLOR_LIGHTER_3 }}>
        <View style={styles.wrapperTags}>
          <Tags
            tagsLabel="Tags: "
            onTagSelected={this.handleTags}
          />
        </View>
        {
          isLoading &&
          <Loading loader={() => (
            <Animatable.Text
              animation="pulse"
              duration={450}
              easing="ease-in-out-cubic"
              iterationCount="infinite"
              style={{ textAlign: 'center' }}
            >
              <Icon name="heart-o" size={33} color="#fff" />
            </Animatable.Text>
          )}
          >
            <Text style={{ color: '#fff' }}>{text}</Text>
          </Loading>
        }
        {
          !isLoading && data.length > 0 &&
          <ListView
            // key={INDEX++}
            removeClippedSubviews={false}
            dataSource={dataSource}
            renderRow={this.renderListItem}
            onEndReached={this.onEndReached}
          />
        }
        {
          !isLoading && data.length === 0 &&
          <View style={{
            flex: 1,
            backgroundColor: '#FFF',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30,
          }}
          >
            <Icon name="heart-o" size={33} color={Styles.COLOR_GREEN} />
            <Text style={{ textAlign: 'center', marginTop: 20, }}>
              Your wishlist will live here. Simply tap the heart on the places you want to save.
            </Text>
          </View>
        }
      </View>
    );
  }
}
