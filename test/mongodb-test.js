const mongoose = require('mongoose');
const chai = require('chai');
const Song = require('../db-mongo-music/Songs.js');
const path = require('path');

const ENV_VARS = path.join(__dirname, '/../variables.env');
require('dotenv').config({ path: ENV_VARS });

describe('Mongo Database Tests', () => {
  before((done) => {
  // make a temporary db
    mongoose.connect(process.env.MONGO_TEST_DATABASE, {
      useMongoClient: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongo db connection error'));
    db.once('open', () => {
      console.log('connected to mongo test database');
      done();
    });
  });

  describe('Mongo Test Database', () => {
    it('Should save a song to Songs', () => {
      const testSong = Song({
        _id: new mongoose.Types.ObjectId(),
        intId: 3,
        title: 'Test Song',
        artist: 'Test Artist',
        songGenre: [7], // made this an array to allow future expansion to multiple song categories
        length: 3000,
        album: 'Test Album',
        year: 2000
      });
      testSong.save((err, data) => {
        if (err) return console.error(err);
        chai.expect(data.title).to.equal('Test Song');
        return 'string to make the linter happy';
      });
    });
  });
});
