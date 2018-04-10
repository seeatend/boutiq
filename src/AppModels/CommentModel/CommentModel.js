import { PropTypes } from 'react';
import { Model } from '../Model';
import CONFIG from '../../../config';

export class CommentModel extends Model {
  static schema = {
    id: PropTypes.number,
    name: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.object,
    comment_is_reported: PropTypes.bool,
  };
  static modelName = 'comment';

}
