import { PropTypes } from 'react';
import { FOLLOW_TYPE } from 'AppConstants';
import { Boutiq } from 'AppServices';
import { Model } from '../Model';
import { PlaceModel } from '../PlaceModel';
import { makeCommentable } from '../Commentable';
import CONFIG from '../../../config';

export class ReviewModel extends Model {

  static baseUrl = `${CONFIG.BOUTIQ_API}/reviews`;
  static schema = {
    id: PropTypes.string,
    text: PropTypes.string,
    tag_names: PropTypes.array,
    stars: PropTypes.string,
    place_attributes: PropTypes.object,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    pictures_attributes: PropTypes.object,
    pictures: PropTypes.array,
    follow_type: PropTypes.oneOf(FOLLOW_TYPE),
    is_reported: PropTypes.bool,
    review_likes: PropTypes.number,
    review_liked: PropTypes.bool,
    user: PropTypes.object,
    place: PropTypes.object,
    comments: PropTypes.array,
  };
  static modelName = 'review';

  constructor(props) {
    super(props);
    this.props.place = new PlaceModel(props.place);
    makeCommentable(this);
  }

  like() {
    return Boutiq.like({ entity: 'reviews', entity_id: this.props.id });
  }

  unlike() {
    return Boutiq.unlike({ entity: 'reviews', entity_id: this.props.id });
  }

  report() {
    return Boutiq.report({ entity: 'reviews', entity_id: this.props.id });
  }

  unReport() {
    return Boutiq.unReport({ entity: 'reviews', entity_id: this.props.id });
  }

  deleteReview() {
    return Boutiq.deleteReview({ entity: 'reviews', entity_id: this.props.id });
  }
}
