let mongoose = require('mongoose');
//var mongoClient = require('mongodb').MongoClient;

// connect to DB, will create it if it does not exist
// will have 20 playlists, 10 playlistGenres
//mongoose.connect('mongodb://localhost/mongo-music');

mongoose.connect('mongodb://localhost/why-u-no-work', {
  useMongoClient: true,
});

let db = mongoose.connection;
db.on('error', function(error) {
  console.log('oopsie, error connecting to mongodb, ', error);
});

/*db.on('connected', function(){
  console.log('mongoose connected to mongodb://localhost/why-u-no-work');
});*/
db.once('open', function() {
  // we are connected
  console.log('connected to mongodb://localhost:27017/mongo-music');
  let songSchema = mongoose.Schema({
    intId: Number,
    title: String
  });

  let Song = mongoose.model('Song', songSchema);

  let song = new Song({
    intId: 1,
    title: 'First Song'
  });

  song.save(function(err, song){
    if (err) {
      console.log('save err ',err);
    } else {
      console.log('im saved ', song);
    }
  });
  console.log('adding a song ', song.title);
  
});

module.exports = db;