const mongoose = require('mongoose');
const config = require('config');

const database = config.get('MONGO_DATABASE');

mongoose.connect(database, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const Playlist = require('../db-mongo-music/Playlists.js');

/* const testObj = {
  playlistID: 1,
  remove: '59f12247683c69928365c547',
  add: '59f12408cc228b92a2f122ce'
}; */
// will delete all copies of the pulled song
// push will fail if the pull does not exist
// nModified":0 is only indication of invalid pull;
const swapSongOnPlaylist = async function (swap, cb) {
  let message = 'swap request status: ';
  console.log('swap received: ', swap);
  try {
    let message = '';
    await Playlist.update(
      { intId: swap.playlistID },
      { $pull: { songs: swap.remove } },
      //{ $push: { songs: swap.add } },
      (err, doc) => {
        if (err) {
          console.log('push: ', err);
          // TODO learn how to make this only happen if error
          message += `${message} ERROR: ${err}`;
          cb(message);
        }
        message += `${message} ${JSON.stringify(doc)}`;
        cb(message);
      }
    );
    await Playlist.update(
      { intId: swap.playlistID },
      //{ $pull: { songs: swap.remove } },
      { $push: { songs: swap.add } },
      (err, doc) => {
        if (err) {
          console.log('pull: ', err);
          // TODO learn how to make this only happen if error
          message += `${message} ERROR: ${err}`;
          cb(message);
        }
        message += `${message} ${JSON.stringify(doc)}`;
        cb(message);
      }
    );
  } catch (error) {
    console.log('THIS BAD THING HAPPENED', error);
  }
};
//swapSongOnPlaylist(testObj, (data) => { console.log(data); });

module.exports = swapSongOnPlaylist;
