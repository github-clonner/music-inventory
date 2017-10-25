const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const songSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  intId: Number,
  title: String,
  artist: Number,
  songGenre: [Number],
  length: Number,
  album: String,
  year: Number,
  dateAdded: { type: Date, default: Date.now },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }]

});

module.exports = mongoose.model('Song', songSchema);
