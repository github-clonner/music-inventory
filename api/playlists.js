
/* Playlists

GET request: /playlists

JSON response will be all playlists:

  genre: 'string',
  playlistID: int,
  playlistGenre: string,
  songIDs: [  // 10 songs
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre],
    [songID, intId, artist, songGenre]
  ]
 }, etc] */

const path = require('path');
const config = require('config');
const database = config.get('MONGO_DATABASE');
const mongoose = require('mongoose');
mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const Song = require('../db-mongo-music/Songs.js');
const musicMaker = require('../data-source/music-maker.js');
const Playlist = require('../db-mongo-music/Playlists.js');

let playlists;

const getAllPlaylists = async function (cb) {
  await Playlist.find({}, (err, data) => {
    if (err) { console.error(err); }
    cb(data);
  });
};

getAllPlaylists(function (data) {console.log(data)});

module.exports = getAllPlaylists;


/*
const getAllPlaylists = async function (cb) {
  await Playlist.find({}, (err, data) => {
    if (err) { console.error(err); }
  }).then((res, rej) => {
    playlists = res;
    cb(playlists);
  });
};*/

