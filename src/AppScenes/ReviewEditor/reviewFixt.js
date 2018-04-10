import { ReviewModel } from 'AppModels';

const review = {
    "id": 934,
    "text": "For Cheeeeese lovers...",
    "stars": 5,
    "created_at": "2017-05-22T00:33:22.533Z",
    "pictures": [
        {
            "image": {
                "url": "https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/388/large_7828d096d8.jpg"
            },
            "large": "https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/388/large_7828d096d8.jpg",
            "medium": "https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/388/medium_7828d096d8.jpg",
            "small": "https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/388/small_7828d096d8.jpg",
            "thumb": "https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/388/thumb_7828d096d8.jpg"
        }
    ],
    "follow_type": "Friend",
    "user": {
        "id": 83,
        "name": "Sylvain Della-Libéra",
        "location": "Sydney, New South Wales, Australia",
        "email": "sylvain75004@hotmail.com",
        "public": false,
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/15823268_10210323715543160_865016925086203972_n.jpg?oh=873a833ee40a5990392952993ada67b5&oe=59A375BD",
        "isFollowing": true,
        "isFollower": true
    },
    "place": {
        "id": 542,
        "google_place_id": "ChIJufYZfzewEmsRVrTNXWt1nv0",
        "name": "The Stinking Bishops",
        "lat": -33.8984767,
        "lng": 151.1754438,
        "tag_names": [
            "Eat", "Drink", "Sleep"
        ],
        "local": " Newtown, AU",
        "country": "Australia",
        "administrative_area_level_1": "AU",
        "name_address": "5/63-71 Enmore Road, Newtown",
        "best_rated_pictures": ["https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/388/large_7828d096d8.jpg", "https://d21bucv8owtd8n.cloudfront.net/uploads/picture/image/310/large_picname_1491276969-file.jpeg"]
    },
    "comments": []
}

export const REVIEW_FIXTURE = new ReviewModel(review);
