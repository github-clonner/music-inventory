const mongoose = require('mongoose');
const Songs = require('./Songs.js');
const Playlists = require('./Playlists.js');
const config = require('config');
const genrelookup = require('../data-source/playlist-genres.js')

const database = config.get('MONGO_DATABASE');
mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const makePlaylist = {};

/*makePlaylist.playlistCount = async function () {
  await Playlists.count({}, (err, count) => {
    if (err) { console.error(err); }
    console.log('playlists: ', count);
  });
};

makePlaylist.songCount = async function () {
  await Songs.count({}, (err, count) => {
    if (err) { console.error(err); }
    console.log('songs: ', count);
  });
};*/

// genre must be an integer between 1 - 10 inclusive
// genre 7 is a mixed list
makePlaylist.getTenRandomGenres = async function () {
  await Songs.aggregate({ $sample: { size: 10 } }, (err, stuff) => {
    if (err) { console.error(err); }
    console.log(stuff);
  });
};
// genreObj is {songGenre: int} where int is number btwn 1 -10 inclusive
// id is playlist id, expect to have 1 - 20, but more wont break anything. yet.
makePlaylist.newGenrePlaylist = async function (genreObj, id) {
  const list = [];

  await Songs.find(genreObj, (err, stuff) => {
    if (err) { console.error(err); }
    console.log('I have this many songs in that genre: ', stuff.length);
    const uniqueSongs = {};
    for (let i = 0; i < 10; i += 1) {
      const rand = Math.floor(Math.random() * stuff.length);
      // pass over any duplicate song
      if (uniqueSongs[stuff[rand]._id]) {
        i -= 1;
      } else {
        // add non duplicate song
        uniqueSongs[stuff[rand]._id] = true;
        list.push(stuff[rand]._id);
      }
    }
    const playlist = new Playlists({
      intId: id,
      playlistGenre: {
        number: genreObj.songGenre,
        name: genrelookup.lookup(genreObj.songGenre)
      },
      songs: list
    });
    playlist.save((error, data) => {
      if (err) { console.error(error); }
      console.log('Here is a brand new playlist', data);
    });
  });
};

// call this function when running file in console
// run 20 versions to make playlists
async function doTheStuff() {
  await makePlaylist.newGenrePlaylist({ songGenre: 3 }, 99);
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
  });
}

doTheStuff();
module.exports = makePlaylist;
