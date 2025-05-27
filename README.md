❯ http GET http://localhost:8080/api/movies
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 712
Content-Type: application/json; charset=utf-8
Date: Tue, 27 May 2025 18:36:30 GMT
ETag: W/"2c8-ZsYrnZm2BRmEH6qILr9Lmq8iTJs"
Keep-Alive: timeout=5
X-Powered-By: Express

[
    {
        "linkToIMDB": "https://www.imdb.com/title/tt0133093/",
        "movieId": 1,
        "rating": "4.5",
        "summary": "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
        "title": "The Matrix"
    },
    {
        "linkToIMDB": "https://www.imdb.com/title/tt1375666/",
        "movieId": 2,
        "rating": "4.8",
        "summary": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        "title": "Inception"
    },
    {
        "linkToIMDB": "https://www.imdb.com/title/tt0816692/",
        "movieId": 3,
        "rating": "4.7",
        "summary": "A team of explorers travel through a wormhole in space in an attempt to ensure that humanity survives.",
        "title": "Interstellar"
    }
]

❯ http PUT http://localhost:8080/api/movies/3 title=Interstellar summary='A team of astronauts travel through a wormhole in space in an attempt to ensure that humanity survives.' linkToIMDB=https://www.imdb.com/title/tt0816692/ rating:=4.0
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 220
Content-Type: application/json; charset=utf-8
Date: Tue, 27 May 2025 18:55:05 GMT
ETag: W/"dc-zrVnWn/H63NwHIn/OoAKg4etiV0"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "linkToIMDB": "https://www.imdb.com/title/tt0816692/",
    "movieId": 3,
    "rating": "4.0",
    "summary": "A team of astronauts travel through a wormhole in space in an attempt to ensure that humanity survives.",
    "title": "Interstellar"
}

❯ http POST http://localhost:8080/api/movies title='The Dark Knight' summary='When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.' linkToIMDB=https://www.imdb.com/title/tt0468569/ rating:=4.9
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 286
Content-Type: application/json; charset=utf-8
Date: Tue, 27 May 2025 19:00:32 GMT
ETag: W/"11e-J6WOTbMM/cCBP/ecPCQh8/pA7kE"
Keep-Alive: timeout=5
X-Powered-By: Express

{
    "linkToIMDB": "https://www.imdb.com/title/tt0468569/",
    "movieId": 4,
    "rating": "4.9",
    "summary": "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
    "title": "The Dark Knight"
}

❯ http DELETE http://localhost:8080/api/movies/2
[
    {
        "linkToIMDB": "https://www.imdb.com/title/tt0133093/",
        "movieId": 1,
        "rating": "4.5",
        "summary": "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
        "title": "The Matrix"
    },
    {
        "linkToIMDB": "https://www.imdb.com/title/tt0816692/",
        "movieId": 3,
        "rating": "4.0",
        "summary": "A team of astronauts travel through a wormhole in space in an attempt to ensure that humanity survives.",
        "title": "Interstellar"
    },
    {
        "linkToIMDB": "https://www.imdb.com/title/tt0468569/",
        "movieId": 4,
        "rating": "4.9",
        "summary": "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
        "title": "The Dark Knight"
    }
]