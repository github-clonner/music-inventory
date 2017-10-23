// this file is a temporary prototype
// TODO break playlist Schema into own file


const mongoose = require('mongoose');

// connect to DB, will create it if it does not exist
// will have 20 playlists, 10 playlistGenres
mongoose.connect('mongodb://localhost/mongo-music', {
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  // we are connected
  console.log('connected to db mongo-music');
  let songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    intId: Number,
    title: String,
    artist: String,
    songGenre: [Number],
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
//https://dev.mysql.com/doc/refman/5.7/en/creating-database.html
  //www.lucidchart.com
  //https://docs.mongodb.com/manual/core/data-model-design/
//https://www.npmjs.com/package/word-list
//https://github.com/sindresorhus/random-word
  //http://mongoosejs.com/docs/guide.html
 // http://mongoosejs.com/docs/index.html
// http://mongoosejs.com/docs/populate.html
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
  let Song = mongoose.model('Song', songSchema);
  let Playlist = mongoose.model('Playlist', playlistSchema);

  let song = new Song({
    _id: new mongoose.Types.ObjectId,
    intId: 3,
    title: 'third Song',
    artist: '3 Artist',
    songGenre: [7], // made this an array to allow future expansion to multiple song categories
    length: 3000,
    album: '3 Album',
    year: 2000
  });

  song.save(function(err, song) {
    if (err) {
      console.log('save err ', err);
    } else {
      console.log('im saved ', song);
    }
  });
  console.log('adding a song ', song);

  let playlist = new Playlist({
    intId: 7,
    playlistGenre: {'number': 777, 'name': 'great list'},
    dateLastModified: Date.now(),
    songs: ['59ece2d85764e303adb1da71']
  });

  playlist.save(function(err, playlist) {
    if (err) {
      console.log('playlist save errrrror ', err);
    } else {
      console.log('wow, playlist actually saved better check song id matches up ', playlist);
    }
  });
  
});

let mdb = {};
mdb.saveSong = function() {
  mongoose.connect('mongodb://localhost/mongo-music', {
    useMongoClient: true,
  });
};

module.exports = mdb;
