export const AppProfile = {
  "id": 3,  //the user's id
  "name": "Christine Lau", // the user's name
  "location": "San Francisco, CA, United States", // the user's location etc...
  "propic": "http://3.bp.blogspot.com/-tNNKVoFdSTQ/Ucrizd4LdGI/AAAAAAAAFpk/-2-qoeTXkAE/s1600/liu-yi-fei-+(5).jpg",
  "user_friends": [ //the user's facebook friends not including him or herself
    {
      "id": 4,
      "name": "Discover Boutiq",
      "location": "San Francisco, CA, United States",
      "propic": "http://graph.facebook.com/109373342776560/picture?type=large"
    },
    {
      "id": 3,
      "name": "Jeep Wrangler",
      "location": "San Francisco, CA, United States",
      "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
    },
    {
      "id": 1,
      "name": "Christine Lau",
      "location": "San Francisco, CA, United States",
      "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10644606_10204135160313158_5625840248954293316_n.jpg?oh=acdf735f39c1e75ed68f59448e200ec0&oe=583DF005"
    }
  ],
  "user_followers": [
    {
      "id": 4,
      "name": "Discover Boutiq",
      "location": "San Francisco, CA, United States",
      "propic": "http://graph.facebook.com/109373342776560/picture?type=large"
    },
    {
      "id": 3,
      "name": "Jeep Wrangler",
      "location": "San Francisco, CA, United States",
      "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
    },
  ], //user's followers array ---in who are following this user
  "user_followings": [ //users following array ---in who they follow
    {
      "id": 14,
      "name": "Github Cat",
      "location": "San Francisco, CA, United States",
      "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13692608_107387726366022_7198275052794265971_n.jpg?oh=1190ee09ed5dfc47b9abc19ae25f9b6d&oe=585186E8"
    }
  ],
  "followers_count": 2, //count of how many followers
  "followings_count": 1, //count of how many users that he/she is following
  "following_url": "",  // if it is their own profile there will be no following_url, following_text, etc..
  "following_text": "",
  "following_method": "",
  "block_url": "",
  "block_text": "",
  "block_method": "",
  "current_page": 1,
  "per_page": 20,
  "total_entries": 9,
  "feed_entries": [
    {
      "feed_type": "review",
      "id": 100,
      "text": "Yummmy Donuts here!",
      "stars": 5,
      "review_user": { //the user of the review
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/100/edit",
      "review_url": "http://localhost:3000/reviews/100",
      "place": {
        "id": 29,
        "name": "Donut Savant",
        "local": "Oakland, CA",
        "name_address": "Broadway, Oakland, CA, United States",
        "tag": [
          "Eat",
          "Drink"
        ],
        "photo": "https://lh4.googleusercontent.com/-tpzVYLYdUEk/Uo2w735sPpI/AAAAAAAAE1U/Hv20fS3_RI05ly9lQ66EnTSrtYr04f07Q/w400-h400-k/",
        "google_place_id": "ChIJtcGTfLKAj4ARLw1fUYkia1s"
      },
      "place_liked?": false,
      "like_url": "/likes/29",
      "like_method": "POST",
      "comments": [] // Comments for the review
    },
    {
      "feed_type": "post",
      "id": 26,
      "status": "WHOOOO",
      "updated_at": "2016-08-18T23:48:01.020Z",
      "post_user": { //post of the reviewer
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "post_edit_url": "http://localhost:3000/posts/26/edit",
      "post_url": "http://localhost:3000/posts/26",
      "comments": [ //comments of the reviewer
        {
          "id": 49,
          "text": "HELLLOOO",
          "user": {
            "id": 3,
            "name": "Jeep Wrangler",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
          },
          "comment_user_url": "http://localhost:3000/users/3",
          "post_comment_edit_url": "http://localhost:3000/posts/26/comments/49",
          "post_comment_delete_url": "http://localhost:3000/posts/26/comments/49"
        }
      ]
    },
    {
      "feed_type": "post",
      "id": 25,
      "status": "Hellooo",
      "updated_at": "2016-08-18T23:37:25.563Z",
      "post_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "post_edit_url": "http://localhost:3000/posts/25/edit",
      "post_url": "http://localhost:3000/posts/25",
      "comments": []
    },
    {
      "feed_type": "review",
      "id": 81,
      "text": "YUMM",
      "stars": 5,
      "review_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/81/edit",
      "review_url": "http://localhost:3000/reviews/81",
      "place": {
        "id": 24,
        "name": "Zachary's Chicago Pizza",
        "local": "Oakland, CA",
        "name_address": "College Avenue, Oakland, CA, United States",
        "tag": [
          "Eat"
        ],
        "photo": "https://lh5.googleusercontent.com/-dVN_CRtWbf8/UduSQ7YT9gI/AAAAAAAAAAc/7lZtMJawCioMAmZzRHKlyCoJbQEsxHyQQ/w400-h400-k/",
        "google_place_id": "ChIJ9bZJbMN9hYARZ3JGwPCPnfc"
      },
      "place_liked?": false,
      "like_url": "/likes/24",
      "like_method": "POST",
      "comments": []
    },
    {
      "feed_type": "review",
      "id": 80,
      "text": ":)",
      "stars": 4,
      "review_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/80/edit",
      "review_url": "http://localhost:3000/reviews/80",
      "place": {
        "id": 23,
        "name": "Burma Superstar",
        "local": "Oakland, CA",
        "name_address": "Telegraph Avenue, Oakland, CA, United States",
        "tag": [
          "Eat"
        ],
        "photo": "https://lh4.googleusercontent.com/-f5q2A9Wz52E/Vu4OiJFWqvI/AAAAAAAAAGk/SCiqx9AHnWA73iVK1ImLtduGzvC6O2lUw/w400-h400-k/",
        "google_place_id": "ChIJX5U6hOF9hYARluNcw9h5G5U"
      },
      "place_liked?": false,
      "like_url": "/likes/23",
      "like_method": "POST",
      "comments": []
    },
    {
      "feed_type": "review",
      "id": 79,
      "text": "YUMMMM!",
      "stars": 5,
      "review_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/79/edit",
      "review_url": "http://localhost:3000/reviews/79",
      "place": {
        "id": 22,
        "name": "Belly",
        "local": "Oakland, CA",
        "name_address": "San Pablo Avenue, Oakland, CA, United States",
        "tag": [
          "Eat"
        ],
        "photo": "https://lh5.googleusercontent.com/-8AWz27a9JYU/VqSHgCwFzDI/AAAAAAAAJcQ/AdUblQ5hO7gXVu7FdMbGb7_a2nnpeTRUg/w400-h400-k/",
        "google_place_id": "ChIJBey8Wq6Aj4ARamLU43rgyLE"
      },
      "place_liked?": false,
      "like_url": "/likes/22",
      "like_method": "POST",
      "comments": [
        {
          "id": 47,
          "text": "HELLLOOO",
          "user": {
            "id": 1,
            "name": "Christine Lau",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10644606_10204135160313158_5625840248954293316_n.jpg?oh=acdf735f39c1e75ed68f59448e200ec0&oe=583DF005"
          },
          "comment_user_url": "http://localhost:3000/users/1"
        }
      ]
    },
    {
      "feed_type": "review",
      "id": 78,
      "text": "HELLOO",
      "stars": 5,
      "review_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/78/edit",
      "review_url": "http://localhost:3000/reviews/78",
      "place": {
        "id": 22,
        "name": "Belly",
        "local": "Oakland, CA",
        "name_address": "San Pablo Avenue, Oakland, CA, United States",
        "tag": [
          "Eat"
        ],
        "photo": "https://lh5.googleusercontent.com/-8AWz27a9JYU/VqSHgCwFzDI/AAAAAAAAJcQ/AdUblQ5hO7gXVu7FdMbGb7_a2nnpeTRUg/w400-h400-k/",
        "google_place_id": "ChIJBey8Wq6Aj4ARamLU43rgyLE"
      },
      "place_liked?": false,
      "like_url": "/likes/22",
      "like_method": "POST",
      "comments": []
    },
    {
      "feed_type": "review",
      "id": 77,
      "text": "HEllloooo",
      "stars": 5,
      "review_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/77/edit",
      "review_url": "http://localhost:3000/reviews/77",
      "place": {
        "id": 22,
        "name": "Belly",
        "local": "Oakland, CA",
        "name_address": "San Pablo Avenue, Oakland, CA, United States",
        "tag": [
          "Eat"
        ],
        "photo": "https://lh5.googleusercontent.com/-8AWz27a9JYU/VqSHgCwFzDI/AAAAAAAAJcQ/AdUblQ5hO7gXVu7FdMbGb7_a2nnpeTRUg/w400-h400-k/",
        "google_place_id": "ChIJBey8Wq6Aj4ARamLU43rgyLE"
      },
      "place_liked?": false,
      "like_url": "/likes/22",
      "like_method": "POST",
      "comments": []
    },
    {
      "feed_type": "review",
      "id": 18,
      "text": "Yay",
      "stars": 5,
      "review_user": {
        "id": 3,
        "name": "Jeep Wrangler",
        "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
      },
      "review_edit_url": "http://localhost:3000/reviews/18/edit",
      "review_url": "http://localhost:3000/reviews/18",
      "place": {
        "id": 14,
        "name": "Mu",
        "local": ", Bali",
        "name_address": "Bali, Jalan Pantai Bingin, Pecatu, Badung Regency, Indonesia",
        "tag": [
          "Do"
        ],
        "photo": "https://lh4.googleusercontent.com/-r3SWtnbwIk0/Uhk577Au7fI/AAAAAAAAAFY/QgBhAhwTzTQ/w400-h400-k/",
        "google_place_id": "ChIJReQKfEZF0i0ROwnuSbSr_wo"
      },
      "place_liked?": false,
      "like_url": "/likes/14",
      "like_method": "POST",
      "comments": [
        {
          "id": 8,
          "text": "Hello",
          "user": {
            "id": 1,
            "name": "Christine Lau",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10644606_10204135160313158_5625840248954293316_n.jpg?oh=acdf735f39c1e75ed68f59448e200ec0&oe=583DF005"
          },
          "comment_user_url": "http://localhost:3000/users/1"
        },
        {
          "id": 9,
          "text": "What's up?? HEYYY LOLLL",
          "user": {
            "id": 3,
            "name": "Jeep Wrangler",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/946446_160074151051801_6230809292333481579_n.jpg?oh=7690b166f6b4b54b6bac6d773df45f32&oe=583F4013"
          },
          "comment_user_url": "http://localhost:3000/users/3",
          "review_comment_edit_url": "http://localhost:3000/reviews/18/comments/9",
          "review_comment_delete_url": "http://localhost:3000/reviews/18/comments/9"
        },
        {
          "id": 32,
          "text": "WHATS",
          "user": {
            "id": 1,
            "name": "Christine Lau",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10644606_10204135160313158_5625840248954293316_n.jpg?oh=acdf735f39c1e75ed68f59448e200ec0&oe=583DF005"
          },
          "comment_user_url": "http://localhost:3000/users/1"
        },
        {
          "id": 45,
          "text": "Hello",
          "user": {
            "id": 14,
            "name": "Github Cat",
            "propic": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13692608_107387726366022_7198275052794265971_n.jpg?oh=1190ee09ed5dfc47b9abc19ae25f9b6d&oe=585186E8"
          },
          "comment_user_url": "http://localhost:3000/users/14"
        }
      ]
    }
  ]
}
