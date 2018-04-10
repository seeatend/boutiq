import { PropTypes } from 'react';
import { Model } from '../Model';
import CONFIG from '../../../config';

export class PlaceModel extends Model {

  static baseUrl = `${CONFIG.BOUTIQ_API}/places`;
  static schema = {
    id: PropTypes.number,
    google_place_id: PropTypes.string,
    name: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    tag_names: PropTypes.array,
    photo: PropTypes.string,
    local: PropTypes.string,
    country: PropTypes.string,
    administrative_area_level_1: PropTypes.string,
    neighborhood: PropTypes.string,
    name_address: PropTypes.string,
    route: PropTypes.string,
    place_liked: PropTypes.bool,
    best_rated_pictures: PropTypes.array,
    friends_avg: PropTypes.number,
    friends_avg_count: PropTypes.number,
    recommended_users_avatar: PropTypes.array,
    likes: PropTypes.number,
    is_reported: PropTypes.bool,
  };
  static modelName = 'place';

}
