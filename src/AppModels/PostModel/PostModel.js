import { PropTypes } from 'react';
import { Model } from '../Model';
import { Boutiq } from 'AppServices';
import { makeCommentable } from '../Commentable';
import CONFIG from '../../../config';

export class PostModel extends Model {

  static baseUrl = `${CONFIG.BOUTIQ_API}/posts`;
  static schema = {
    id: PropTypes.number,
    status: PropTypes.string,
    // user_id: PropTypes.number,
    user: PropTypes.object,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    post_likes: PropTypes.number,
    post_liked: PropTypes.bool,
    post_is_reported: PropTypes.bool,
    comments: PropTypes.array,
  };
  static modelName = 'post';

  constructor(props) {
    super(props);
    makeCommentable(this);
  }

  like() {
    return Boutiq.like({ entity: 'posts', entity_id: this.props.id });
  }

  unlike() {
    return Boutiq.unlike({ entity: 'posts', entity_id: this.props.id });
  }

  report() {
    return Boutiq.report({ entity: 'posts', entity_id: this.props.id });
  }

  unReport() {
    return Boutiq.unReport({ entity: 'posts', entity_id: this.props.id });
  }

  deleteReview() {
    return Boutiq.deleteReview({ entity: 'posts', entity_id: this.props.id });
  }
}
