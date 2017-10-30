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

// recommended no use arrow functions for statics
songSchema.statics.findTitle = function (title, cb) {
  console.log('searching for a title ', title);
  return this.find({ title }, cb);
};

songSchema.statics.findArtist = function (artist, cb) {
  console.log('searching for an artist ', artist);
  // console.log(this.find({ artist }));
  return this.find({ artist }, cb);
};

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
