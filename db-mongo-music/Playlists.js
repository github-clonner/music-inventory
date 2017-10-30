const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const playlistSchema = mongoose.Schema({
  intId: Number,
  playlistGenre: { number: Number, name: String },
  dateLastModified: { type: Date, default: Date.now },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

playlistSchema.methods.deleteDuplicateSongs = function (cb) {
  this.model('Playlists').find({ songs: {} }, cb);
};



module.exports = mongoose.model('Playlist', playlistSchema);
