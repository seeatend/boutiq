import CONFIG from '../../config';
import { AsyncStorage } from 'react-native';

import { helpers } from './helpers';
import { Boutiq } from './boutiq';
import { User } from './user';

export const Auth = {
  isSignedIn() {
    return AsyncStorage.getItem('user_id')
    .then(userId => !!userId);
  },
  signin() {
    return AccessToken.getCurrentAccessToken()
    .then(({ accessToken, userID }) => {
      const FACEBOOK_AUTH = JSON.stringify({
        token: accessToken,
        uid: userID
      });
      return fetch(`${CONFIG.BOUTIQ_API}/auth`, {
        headers: { FACEBOOK_AUTH }
      });
    }, (error) => {
      console.log("ERROR!!!", error);
    })
    .then(result => result.json())
    .then(data => {
      const { user_id: id } = data;
      const keyValuePairs = helpers.objectToKeyValuesPairs(data, val => val.toString());
      return AsyncStorage.multiSet(keyValuePairs)
      .then(() => Boutiq.getProfile(id))
      .then(profile => {
        User.set(profile);
        return {
          success: true,
          payload: Object.assign({ id }, profile)
        };
      });
    })
    .catch(e => {
      console.error("debug", e);
    });
  },
  signout() {
    const keyValuePairs = helpers.objectToKeyValuesPairs({
      user_id: '',
      token: '',
      uid: '',
      profile: ''
    }, val => val.toString());
    return AsyncStorage.multiSet(keyValuePairs);
  },
};
