let mongoose = require('mongoose');

// connect to DB, will create it if it does not exist
// will have 20 playlists, 10 playlistGenres
mongoose.connect('mongodb://localhost/mongo-music', {
  useMongoClient: true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  // we are connected
  console.log('connected to db mongo-music');
  let songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    intId: Number,
    title: String,
    artist: String,
    songGenre: Number,
    length: Number,
    album: String,
    year: Number,
    dateAdded: {type: Date, default: Date.now},
    playlists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Playlist'}]

  });
  let playlistSchema = mongoose.Schema({
    intId: Number,
    playlistGenre: {'number': Number, 'name': String},
    dateLastModified: {type: Date, default: Date.now},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
  });

  let Song = mongoose.model('Song', songSchema);
  let Playlist = mongoose.model('Playlist', playlistSchema);

  let song = new Song({
    //_id: new mongoose.Schema.Types.ObjectId,
    intId: 1,
    title: 'First Song',
    artist: 'First Artist',
    songGenre: 7,
    length: 3000,
    album: 'First Album',
    year: 2000
  });

  song.save(function(err, song) {
    if (err) {
      console.log('save err ', err);
    } else {
      console.log('im saved ', song);
    }
  });
  console.log('adding a song ', song.title);
  
});

module.exports = db;
