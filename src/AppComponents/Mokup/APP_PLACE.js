export const APP_PLACE = {
  "id": 29, //id of the place
  "name": "Donut Savant", //place details
  "street_number": "1934",
  "locality": "Oakland",
  "administrative_area_level_1": "CA",
  "short_addy": "1934 Broadway",
  "google_place_id": "ChIJtcGTfLKAj4ARLw1fUYkia1s", //google place id
  "country": "United States",
  "photo": "https://lh4.googleusercontent.com/-tpzVYLYdUEk/Uo2w735sPpI/AAAAAAAAE1U/Hv20fS3_RI05ly9lQ66EnTSrtYr04f07Q/w400-h400-k/",
  "tag": [ //tags
    "Eat",
    "Drink"
  ],
  "like_url": "/likes/29", //if the place has been liked?  if it hasn't been liked the method would be a POST
  "like_method": "POST", //if the place hasn't been liked then the method would be DELETE
  "avg_rating": 5, //average rating out of My Network
  "other_avg_rating": 0, //average rating out of Other Users
  "network_current_page": 1, //page params of the My Network reviews
  "network_per_page": 20,
  "network_total_entries": 1,
  "network_entries": [ //each entry is a review
    {
      "stars": 5,
      "text": "Yummmy Donuts here!",
      "review_user": {
        "id": 3,
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013",
        "name": "Jeep Wrangler"
      },
      "review_user_url": "http://localhost:3000/users/3",
      "friend_or_following": "Friend",
      "review_edit_url": "http://localhost:3000/reviews/100/edit",
      "review_url": "http://localhost:3000/reviews/100",
      "comments": [ //comments for the review
        {
          "id": 52,
          "text": "Comment for Review 100",
          "user": {
            "id": 1,
            "name": "Christine Lau",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10644606_10204135160313158_5625840248954293316_n.jpg?oh=acdf735f39c1e75ed68f59448e200ec0&oe=583DF005"
          },
          "comment_user_url": "http://localhost:3000/users/1" //user's profile link
        },
        {
          "id": 53,
          "text": "Comment for Review 100",
          "user": {
            "id": 3,
            "name": "Jeep Wrangler",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
          },
          "comment_user_url": "http://localhost:3000/users/3",
          "review_comment_edit_url": "http://localhost:3000/reviews/100/comments/53",
          "review_comment_delete_url": "http://localhost:3000/reviews/100/comments/53"
        }
      ]
    }
  ]
}
