import { AsyncStorage } from 'react-native';
import { helpers } from './helpers';
import CONFIG from '../../config';

export const Boutiq = {
  getProfile(id) {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/users/${id}`);
  },
  // updateProfile(id) {
  //   return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/users/${id}`)
  // },
  getPlaces(params, feedName) {
    if (!feedName) {
      throw new Error('Missing feed name');
    }
    const query = Object.keys(params).reduce((memo, key) => {
      if (params[key] === null) {
        return memo;
      }
      let res = memo;
      if (memo.length !== 0) {
        res = `${memo}&`;
      }
      return `${res}${key}=${params[key]}`;
    }, '');
    return AsyncStorage.getItem('user_id')
    .then(userId => helpers
      .request(`${CONFIG.BOUTIQ_API}/users/${userId}/${feedName}?${query}`)
    );
  },
  getProfileFeed(params) {
    const { userId, page } = params;
    if (!userId) {
      throw new Error('Missing user id');
    }
    // return helpers.request(`${CONFIG.BOUTIQ_API}/users/${userId}`);
    return helpers.request(`${CONFIG.BOUTIQ_API}/users/${userId}/reviews?page=${page}`);
  },
  getMyNetworkFeed(params = { page: 1 }) {
    return this.getPlaces(params, 'feed');
  },
  getDiscoverFeed(params = { page: 1 }) {
    return this.getPlaces(params, 'discover');
  },
  getPlaceReviews(params) {
    const { placeId, page, extra } = params;
    if (!placeId) {
      throw new Error('Missing place id');
    }
    return helpers.request(`${CONFIG.BOUTIQ_API}/places/${placeId}${extra}?page=${page}`);
  },
  getPlaceReviewsByMyNetwork(params = { page: 1, placeId: null }) {
    return this.getPlaceReviews(Object.assign({
      extra: '',
      page: 1,
    }, params));
  },
  getPlaceReviewsByOthers(params = { page: 1, placeId: null }) {
    return this.getPlaceReviews(Object.assign({
      extra: '/other_reviews',
      page: 1,
    }, params));
  },
  getEntityLikes(params = { entity: null, entity_id: null, user_id: null }) {
    const { entity, entity_id: entityId, user_id: userId } = params;
    if (!(entity && entityId)) {
      throw new Error('Missing entity');
    }
    // user_id: for getting filter for particular user
    // https://boutiq-travel.herokuapp.com/api/v1/likes/:entity/:entity_id
    // https://boutiq-travel.herokuapp.com/api/v1/likes/:entity/:entity_id?user_id=1
    let query = '';
    if (userId !== null) {
      query = `user_id=${userId}`;
    }
    return helpers.request(`${CONFIG.BOUTIQ_API}/likes/${entity}/${entityId}`);
    // return helpers.request(`${CONFIG.BOUTIQ_API}/likes/${entity}/${entityId}?${query}`);
  },
  like(params = { entity: null, entity_id: null }) {
    const { entity, entity_id: entityId } = params;
    if (!(entity || entityId)) {
      throw new Error('Missing entity');
    }
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/likes/${entity}/${entityId}`, {
      method: 'POST'
    });
  },
  unlike(params = { entity: null, entity_id: null }) {
    const { entity, entity_id: entityId } = params;
    if (!(entity || entityId)) {
      throw new Error('Missing entity');
    }
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/likes/${entity}/${entityId}`, {
      method: 'DELETE'
    });
  },
  getWishlist(params = { page: 1, user_id: null, tags: null }) {
    const { page, user_id: userId, tags } = params;
    let query = '';

    if (!userId) {
      throw new Error('Missing user_id');
    }

    if (tags) {
      query += `&tag=${tags}`;
    }

    return helpers.request(`${CONFIG.BOUTIQ_API}/users/${userId}/wishlist?page=${page}${query}`);
  },
  getMyNetworkSearch(params = { page: 1, tags: null, lat: null, lng: null, radius: 5 }) {
    const { tags, page, lat, lng, radius } = params;
    let query = '';
    if (lat && lng) {
      query += `&search[lat]=${lat}&search[lng]=${lng}`;
    }

    if (radius) {
      query += `&radius=${radius}`;
    }

    if (tags) {
      query += `&search[tag]=${tags}`;
    }

    if (page) {
      query += `&page=${page}`;
    }
    return helpers.request(`${CONFIG.BOUTIQ_API}/destinations/search?${query}`);
  },
  getDiscoverSearch(params = {
    page: 1,
    tags: null,
    lat: null,
    lng: null,
    radius: 5
  }) {
    const { tags, page, lat, lng, radius } = params;
    let query = '';
    if (lat && lng) {
      query += `&lat=${lat}&lng=${lng}`;
    }

    if (radius) {
      query += `&radius=${radius}`;
    }

    if (tags) {
      query += `&tag=${tags}`;
    }

    if (page) {
      query += `&page=${page}`;
    }
    return helpers.request(`${CONFIG.BOUTIQ_API}/destinations/searchdscvr?${query}`);
  },

  report(params = { entity: null, entity_id: null }) {
    const { entity, entity_id: entityId } = params;
    if (!(entity || entityId)) {
      throw new Error('Missing entity or/and entity_id');
    }
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/${entity}/${entityId}/reports`, {
      method: 'POST'
    });
  },
  unReport(params = { entity: null, entity_id: null }) {
    const { entity, entity_id: entityId } = params;
    if (!(entity || entityId)) {
      throw new Error('Missing entity or/and entity_id');
    }
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/${entity}/${entityId}/reports`, {
      method: 'DELETE'
    });
  },

  deleteReview(params = { entity: null, entity_id: null }) {
    const { entity, entity_id: entityId } = params;
    if (!(entity || entityId)) {
      throw new Error('Missing entity or/and entity_id');
    }
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/${entity}/${entityId}`, {
      method: 'DELETE'
    });
  },
  getAllTags() {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/tags`);
  },
  getNotifications(params) {
    const { page } = params;
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/notifications?page=${page}`);
  },
  updateNotifications(notificationId) {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/notifications/${notificationId}`, {
      method: 'PUT'
    });
  },
  getActivities() {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/activity_types`);
  },
};
