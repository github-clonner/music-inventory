// will execute a callback with object containg all playlists;

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
let m = {};
m.getAllPlaylists = async function (cb) {
  await Playlist.find({})
    .populate('songs', '_id intId artist songGenre')
    .exec((err, data) => {
      if (err) { console.error(err); }
      cb(data);
    });
};

// getAllPlaylists((data) => { console.log(data[0].songs[0]); });

module.exports = m;
