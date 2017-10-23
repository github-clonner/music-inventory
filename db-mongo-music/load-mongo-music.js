require('dotenv').config({ path: __dirname + '/../variables.env'});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DATABASE, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

const Song = require('./Songs.js');
const musicMaker = require('../data-source/music-maker.js');
//const Playlist = require('Playlists.js');
const makeMongoData = {};

makeMongoData.newMusicData = async function(num) {

  try{
    await Song.insertMany(musicMaker(num));
    console.log('👍 Done!');
    //process.exit();
  } catch (e) {
    console.log('ERROR ', e);
    process.exit();
  }
};

makeMongoData.makeThousands = async function(num, count = 0) {
  try{
    if (num - count === 1) {
      await makeMongoData.newMusicData(1000, count + 1);
      console.log('num - count is 1',num, count);
      count += 1;
      process.exit();
    } else if (num - count > 1){
      await makeMongoData.newMusicData(1000, count + 1);
      console.log('num - count is > 1',num, count);
      count += 1;
      await makeMongoData.makeThousands(num, count)

    }else {
      console.log('all done');
      process.exit();
    }


  } catch (e) {
    console.log('error ', e);
  }
}
//makeMongoData.newMusicData(1000);
makeMongoData.makeThousands(1000);
makeMongoData.randomPlaylists = function(num) {
  // make num playlists of random songs

};

module.exports = makeMongoData;
