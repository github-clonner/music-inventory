let mongoose = require('mongoose');
let playlistGenres = require('./playlist-genres.js');
let db = require('../db-mongo-music/schema.js');

let song = new db.Song({
  _id: new mongoose.Schema.Types.ObjectId,
  intId: 1,
  title: 'First Song',
  artist: 'First Artist',
  songGenre: 7,
  length: 3000,
  album: 'First Album',
  year: 2000
});

// fails db.Song is not constructor

// see http://mongoosejs.com/docs/populate.html for saving 
// cross-referenced data