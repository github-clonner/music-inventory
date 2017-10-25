const mongoose = require('mongoose');
const chai = require('chai');
const Song = require('../db-mongo-music/Songs.js');
const Playlist = require('../db-mongo-music/Playlists.js');
const path = require('path');
const makeMusic = require('../data-source/music-maker.js');
const makeMongoData = require('../db-mongo-music/load-mongo-music.js');

// run tests with NODE_ENV=test to use test DB (see script in package.json)
const config = require('config');

const database = config.get('MONGO_DATABASE');
let db;
describe('Mongo Test Database', () => {
  before((done) => {
  // make a temporary db
    mongoose.connect(database, {
      useMongoClient: true
    });
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongo db connection error'));
    db.once('open', () => {
      done();
    });
  });
  describe('Song Schema', () => {
    it('Should save a song to Songs', (done) => {
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
        if (err) return console.error('error saving to mongoDB', err);
        chai.expect(data.title).to.equal('Test Song');
        return done();
      });
    });
  });
  describe('Playlist Schema', () => {
    it('Should save a Playlist to Playlists', (done) => {
      const testPlaylist = Playlist({
        intId: 7,
        playlistGenre: { number: 777, name: 'great list' },
        dateLastModified: Date.now(),
        songs: ['59ece2d85764e303adb1da71']
      });
      testPlaylist.save((err, data) => {
        if (err) return console.error('error saving to DB, ', err);
        chai.expect(data.playlistGenre.number).to.equal(777);
        return done();
      });
    });
  });

  describe('Data Generation Function', () => {
    it('should generate and add 30 songs to mongoDB', (done) => {
      Song.insertMany(makeMusic(30))
        .then((stuff) => {
          chai.expect(stuff).to.have.lengthOf(30);
          done();
        })
        .catch(err => console.error(err));
    });
  });

  describe('Data Generation Multiplier', function () {
    let beforeCount;
    let afterCount;
    it('should add 1000 songs to mongoDB', (done) => {
      Song.count({}, ((err, count) => {
        if (err) { console.error(err); }
        beforeCount = count;
      }));
      makeMongoData.makeThousands(1) // returns promise
        .then(() => {
          Song.count({}, ((err, count) => {
            if (err) { console.error(err); }
            afterCount = count;
            chai.expect(afterCount - beforeCount).to.equal(1000);
            done();
          }));
        });
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});

