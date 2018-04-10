/* eslint-disable */
import _ from 'lodash';

export const logFactory = (debug, ...args) => {
  if (!debug) {
    return _.noop;
  }
  return console.log.bind(console.log, args);
};
