const mongoose = require('mongoose');
const config = require('config');
const Song = require('../db-mongo-music/Songs.js');
const getArtist = require('../db-mongo-music/Songs').findArtist;

const database = config.get('MONGO_DATABASE');

mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const search = {};

search.title = function (title, cb) {
  Song.findTitle(title, (err, result) => {
    if (err) { console.log(err); }
    console.log(result);
    cb(result);
  });
};
search.artist = function (artist, cb) {
  Song.findArtist(artist, (err, result) => {
    if (err) { console.log(err); }
    console.log(result);
    cb(result);
  });
};
/* console.log(getArtist, Song.findArtist, 'asdf');

search.title('prologs moderators', (result) => {
  console.log('hereitis ', result);
}); */
module.exports = search;
