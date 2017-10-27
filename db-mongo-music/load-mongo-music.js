// TODO to make tests work, need make music in other file then called
// from file with the connection?

const path = require('path');

const config = require('config');
const database = config.get('MONGO_DATABASE');

const mongoose = require('mongoose');
mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const Song = require('./Songs.js');
const musicMaker = require('../data-source/music-maker.js');
const Playlist = require('./Playlists.js');

const makeMongoData = {};

// find starting number to increment a unique integer id for each song
let currentSongCount = 1;
const getSongCount = function () {Song.count({}, (err, count) => {
  if (err) { console.error(err); }
  currentSongCount = count + 1;
  console.log('SONG COUNT IS', currentSongCount);

  // uncomment and run from console to add n or 1000 * n records;
// makeMongoData.newMusicData(3, currentSongCount);
// makeMongoData.makeThousands(3);
});}

makeMongoData.newMusicData = async function (num/*, currentSongCount*/) {
  try {
    await getSongCount();
    console.log('in here', currentSongCount);
    await Song.insertMany(musicMaker(num, currentSongCount));
    // console.log('👍  Done!');
    // process.exit();
  } catch (e) {
    console.log('ERROR ', e);
    // process.exit stops the mocha tests
    // process.exit();
  }
};
// run this 10 times with num = 1000 to generate 10 million initial rows of data
// count controls the number of recurisive calls
makeMongoData.makeThousands = async function (num, count = 0) {
  try {
    if (num - count === 1) {
      await makeMongoData.newMusicData(1000, currentSongCount);
      console.log(`adding ${(count + 1) * 1000} of ${num * 1000}`);
      console.log('👍 all done');
      count += 1;
      // process.exit();
    } else if (num - count > 1) {
      await makeMongoData.newMusicData(1000, currentSongCount);
      console.log(`adding ${(count + 1) * 1000} of ${num * 1000}`);
      currentSongCount += 1000;
      count += 1;
      await makeMongoData.makeThousands(num, count);
    } else {
      console.error('hmmm, error, never expected to end up here');
    }
  } catch (e) {
    console.log('error ', e);
  }
};

makeMongoData.randomPlaylists = function () {
  // TODO make num playlists of random songs
};

module.exports = makeMongoData;
