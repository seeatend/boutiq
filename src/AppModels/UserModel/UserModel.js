import { PropTypes } from 'react';
import { Model } from '../Model';
import { helpers } from 'AppServices';
import CONFIG from '../../../config';

export class UserModel extends Model {

  static baseUrl = `${CONFIG.BOUTIQ_API}/users`;
  static schema = {
    id: PropTypes.number,
    location: PropTypes.string,
    name: PropTypes.string,
    propic: PropTypes.string,
    isFollowing: PropTypes.bool,
    isFollower: PropTypes.bool
  };
  static modelName = 'user';

  getFollowState() {
    return this.props.isFollowing ? 'Following' : 'Follow';
  }

  block() {
    return helpers.requestJSON(`${CONFIG.BOUTIQ_API}/followings/${this.get('id')}/block`, {
      method: 'PATCH'
    });
  }
}
