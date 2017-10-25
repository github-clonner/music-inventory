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
// const Playlist = require('Playlists.js');
const makeMongoData = {};

makeMongoData.newMusicData = async function (num) {
  try {
    await Song.insertMany(musicMaker(num));
    console.log('👍  Done!');
    // process.exit();
  } catch (e) {
    console.log('ERROR ', e);
    // process.exit stops the mocha tests
    // process.exit();
  }
};

makeMongoData.makeThousands = async function (num, count = 0) {
  try {
    if (num - count === 1) {
      await makeMongoData.newMusicData(1000, count + 1);
      console.log(`adding ${(count + 1) * 1000} of ${num * 1000}`);
      count += 1;
      // process.exit();
    } else if (num - count > 1) {
      await makeMongoData.newMusicData(1000, count + 1);
      console.log(`adding ${(count + 1) * 1000} of ${num * 1000}`);
      count += 1;
      await makeMongoData.makeThousands(num, count);
    } else {
      console.log('all done');
      // process.exit();
    }
  } catch (e) {
    console.log('error ', e);
  }
};

makeMongoData.randomPlaylists = function () {
  // TODO make num playlists of random songs
};

// uncomment and run from console to add n or 1000 * n records;
// makeMongoData.newMusicData(3);
// makeMongoData.makeThousands(1000);

module.exports = makeMongoData;
