import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import { helpers } from './helpers';
import CONFIG from '../../config';

export const User = {
  set(profile) {
    this.get()
    .then((current = {}) => AsyncStorage.setItem('profile', JSON.stringify(
      Object.assign({}, current, profile)
    )));
  },
  get() {
    return AsyncStorage.getItem('profile')
    .then(profile => JSON.parse(profile));
  },
  getId() {
    return AsyncStorage.getItem('user_id');
  },
  save(payload) {
    const user = _.pick(payload, 'email', 'location', 'public', 'unseen');
    this.set(user);
    return this.getId()
    .then(userId => helpers.requestJSON(`${CONFIG.BOUTIQ_API}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ user }),
    }));
  },
  saveActivity(payload) {
    const user = _.pick(payload.user, 'name', 'email');
    this.set(user);
    return this.getId()
    .then(userId => helpers.requestJSON(`${CONFIG.BOUTIQ_API}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ user, activity_types: payload.activity_types }),
    }));
  },
  is({ relation, userId }) {
    return this.get()
  .then(profile => _.map(profile[`user_${relation}`], _.property('user.id')).indexOf(userId) > -1);
  },
  isFollowing(userId) {
    return this.is({ relation: 'followings', userId });
  },
  isFollower(userId) {
    return this.is({ relation: 'followers', userId });
  },
  isFriend(userId) {
    return this.is({ relation: 'friends', userId });
  },
  follow(userId) {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/users/${userId}/followings`, {
      method: 'POST'
    });
  },
  unfollow(userId) {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/users/${userId}/followings`, {
      method: 'DELETE'
    });
  },
};
