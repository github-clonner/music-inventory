# mixtape-api

API Documentation

Available data:

All Playlists:

GET request: /playlists

response:

playlists:[{
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
}]

GET request: /search
data: search terms:

playlistID=
songID=
genre=
artist=
years=
album=
title=

response will be an array of up to 50 songs

UPDATE request: /change
data: 
{playlistID: playlistID,
remove: songID,
add: songID}


