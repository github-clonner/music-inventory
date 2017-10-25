const mongoose = require('mongoose');
const Songs = require('./Songs.js');
const Playlists = require('./Playlists.js');
const config = require('config');

const database = config.get('MONGO_DATABASE');
mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
const makePlaylist = {};

makePlaylist.playlistCount = async function () {
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
};

makePlaylist.makeNew = async function(genre) {
  await Songs.aggregate({ $sample: { size: 10 } }, (err, stuff) => {
    if (err) { console.error(err); }
    console.log(stuff);
  });
};

makePlaylist.getTeninGenre = function(genre) {
  await Songs.find({ songGenre: 17 }, (err, stuff) => {
    if (err) { console.error(err); }
    console.log('I have this many songs in that genre: ', stuff.length);
    let list = [];
    for (let i = 0; i < 10; i += 1) {
      let rand = Math.floor(Math.random() * stuff.length);
      list.push(stuff[rand]);
    }
    console.log('here is a list: ', list);
  });
};
// console.log(makePlaylist);

async function doTheStuff() {
  await makePlaylist.playlistCount();
  await makePlaylist.songCount();
  await makePlaylist.makeNew();
  await makePlaylist.getTeninGenre(17);

// TODO find out why this closes too early
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
  });
}

doTheStuff();
module.exports = makePlaylist;
