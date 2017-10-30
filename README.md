## mixtape-api

### API Documentation

TODO:  Add information describing what a bus request looks like.  Will replace endpoint descriptions.

### Playlists

#### GET request: /playlists

JSON response will be all playlists:

```playlists:[{
  genre: 'string',
  playlistID: int,
  playlistGenre: string,
  songIDs: [  // 10 songs
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]],
    [songID, intId, artist, [songGenre]]
  ]	
}, etc]
```
### Song Data

#### POST request: /search
Search by title or artist
```
artist: integer
title: string
```
response will be an array of up to 50 songs including all data fields

Examples:

Examples used temporary data.  Change song name or artist to value which exists in current database.

```
Requests:

$ curl -d "title=distortional" -X POST http://localhost:8000/search

or

$ curl -d "artist=266770" -X POST http://localhost:8000/search

Response:

[
  {
    "_id": "59f12408cc228b92a2f122ce",
    "__v": 0,
    "year": 2014,
    "album": "caramelised",
    "length": 793,
    "artist": 266770,
    "title": "distortional",
    "intId": 3119,
    "playlists": [
      
    ],
    "dateAdded": "2017-10-25T23:53:44.129Z",
    "songGenre": [
      1
    ]
  }
]
```

### Playlist Changes

This request will change one of the songs in a playlist

#### POST request: /change

data: 
```
{playlistID: playlistID,
remove: songID,
add: songID}

playlistID should be an integer between 1 and 20 inclusive
songIDs are strings that correspond to mongo object IDs
```

Example:

```
Request:

$ curl -d "playlistID=1&remove=59f12247683c69928365c429&add=59f12408cc228b92a2f12a0f" -X POST http://localhost:8000/change

Response:

{"n":1,"nModified":1,"ok":1}
```





