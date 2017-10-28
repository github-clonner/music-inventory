const mongoose = require('mongoose');
const Songs = require('./Songs.js');
const Playlists = require('./Playlists.js');
const config = require('config');
const genrelookup = require('../data-source/playlist-genres.js');

const database = config.get('MONGO_DATABASE');
mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const makePlaylist = {};

// selects 10 random songs from entire collection
makePlaylist.getTenRandomGenres = async function () {
  await Songs.aggregate({ $sample: { size: 10 } }, (err, stuff) => {
    if (err) { console.error(err); }
  });
};

// Make a new playlist in a specific genre
// genreObj is {songGenre: int} where int is number btwn 1 -10 inclusive
// id is playlist id, expect to have 1 - 20, but more wont break anything. yet.
makePlaylist.newGenrePlaylist = async function (genreObj, id) {
  const list = [];
  await Songs.find(genreObj, (err, stuff) => {
    if (err) { console.error(err); }
    const uniqueSongs = {};
    // pick a random song and make sure it is not a duplicate
    for (let i = 0; i < 10; i += 1) {
      const rand = Math.floor(Math.random() * stuff.length);
      // pass over any duplicate song and try another
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
    });
  });
};

makePlaylist.newMixedPlaylist = async function (genreObj, id) {
  await Songs.aggregate({ $sample: { size: 10 } }, (err, list) => {
    if (err) { console.error(err); }
    const playlist = new Playlists({
      intId: id,
      playlistGenre: {
        number: genreObj.songGenre,
        name: genrelookup.lookup(genreObj.songGenre)
      },
      songs: list
    });
    playlist.save((error, data) => {
      if (err) { console.error(err); }
      return data;
    });
  });
};

makePlaylist.makeTwenty = async function () {
  for (let count = 1, genre = 0; count < 21; count += 1) {
    // these playlists are mixedGenre
    if (count === 7 || count === 8) {
      await makePlaylist.newMixedPlaylist({ songGenre: genre }, count);
    } else {
      await makePlaylist.newGenrePlaylist({ songGenre: genre }, count);
    }
  }
};

async function doTheStuff() {
  await makePlaylist.makeTwenty();
  // sometimes may close too early?
/*  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
  });*/
}

// uncomment the line below and run file in console to populate database;
// THEN PUT IT BACK OR ALL THE TESTS WILL BREAK
// doTheStuff();
module.exports = makePlaylist;
