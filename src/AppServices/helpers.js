import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export const helpers = {
  insert(arr, index, newItem) {
    return [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted item
      newItem,
      // part of the array after the specified index
      ...arr.slice(index)
    ];
  },
  shortenerAfterFullWord(string, maxLength) {
    const MAX_LENGTH = 25;
    if (!maxLength) {
      maxLength = MAX_LENGTH;
    }
    if (string.length > maxLength) {
      let trimmedString = string.substring(0, maxLength);
      trimmedString = trimmedString.substr(
        0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
      );
      return `${trimmedString}...`;
    }
    return string;
  },
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  objectToKeyValuesPairs(data, process = _.noop) {
    return Object.keys(data).map(key => [key, process(data[key])]);
  },
  keyValuePairsToObject(data) {
    return data.reduce((memo, d) => Object.assign(memo, { [d[0]]: d[1] })
    , {});
  },
  request(url, options = {}) {
    return AsyncStorage.multiGet(['token', 'uid'])
    .then(keyValueArray => {
      const data = this.keyValuePairsToObject(keyValueArray);
      const FACEBOOK_AUTH = JSON.stringify(data);
      const headers = Object.assign(options.headers || {}, { FACEBOOK_AUTH });
      return fetch(url, Object.assign(options, { headers }));
    })
    .then(result => result.json());
  },
  requestJSON(url, options = {}) {
    const headers = Object.assign(options.headers || {}, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.request(url, Object.assign(options, { headers }));
  },
  setAlert(alertMessage, alertType) {
    this.setState({
      alertMessage,
      alertType
    }, () => setTimeout(() => {
      this.setState({
        alertMessage: null,
        alertType: null
      });
    }, 3000));
  }
};
