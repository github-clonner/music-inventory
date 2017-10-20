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
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre],
    [songID, artist, songGenre]
  ]	
}, etc]
```
### Song Data

#### GET request: /search
Data may be described with one or more search terms.  Returned data will match the intersection of the terms.  For example genre AND artist AND year.
```
songID: int
genre: string
artist: string
years={
  start: yyyy,
  end: yyyy
  }
album: string
title: string
```
response will be an array of up to 50 songs including all data fields

### Playlist Changes

This request will change one of the songs in a playlist

### UPDATE request: /change

data: 
```
{playlistID: playlistID,
remove: songID,
add: songID}
```

response:

```{
sucess: bool,
error: message or null,
songDeleted: {
 songId: id,
 title: 'string
 },
songAdded: {
  songId: id,
  title: 'string'
}
```





