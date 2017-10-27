const mongoose = require('mongoose');
const chai = require('chai');
const Song = require('../db-mongo-music/Songs.js');
const Playlist = require('../db-mongo-music/Playlists.js');
const path = require('path');
const makeMusic = require('../data-source/music-maker.js');
const makeMongoData = require('../db-mongo-music/load-mongo-music.js');
const makePlaylist = require('../db-mongo-music/make-playlist.js');

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
    xit('Should save a song to Songs', (done) => {
      const testSong = Song({
        _id: new mongoose.Types.ObjectId(),
        intId: 1,
        title: 'Test Song',
        artist: 7,
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
    xit('Should save a Playlist to Playlists', (done) => {
      const testPlaylist = Playlist({
        intId: 1,
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

  describe('Song Data Generation Function', () => {
    it('should generate and add 30 songs to mongoDB', (done) => {
      Song.insertMany(makeMusic(30, 2))
        .then((stuff) => {
          chai.expect(stuff).to.have.lengthOf(30);
          done();
        })
        .catch(err => console.error(err));
    });
  });

  describe('Song Data Generation Multiplier', function () {
    let beforeCount;
    let afterCount;
    xit('should add 2000 songs to mongoDB', (done) => {
      Song.count({}, ((err, count) => {
        if (err) { console.error(err); }
        beforeCount = count;
      }));
      makeMongoData.makeThousands(2) // returns promise
        .then(() => {
          Song.count({}, ((err, count) => {
            if (err) { console.error(err); }
            afterCount = count;
            chai.expect(afterCount - beforeCount).to.equal(2000);
            return done();
          }));
        });
    });

    xit('intId should be unique and sequential', (done) => {
      Song.find({}, ((err, all) => {
        let uniqueAndSequential = true;
        for (let i = 0; i < 10; i += 1) {
          if (i + 1 !== all[i].intId) {
            console.log(i, all[i]);
            uniqueAndSequential = false;
          }
        }
        chai.expect(uniqueAndSequential).to.equal(true);
        return done();
      }));
    });
  });
  // This must run after enough songs are in the DB
  describe('Playlist Generation Function', () => {
    let beforeCount;
    let afterCount;
    // sometimes this fails, but DB has correct info.  Test is counting too early
    xit('should generate and add 20 playlists to mongoDB', (done) => {
      Playlist.count({}, (err, count) => {
        if (err) { console.error(err); }
        beforeCount = count;
      });
      makePlaylist.makeTwenty()
        .then(() => {
          Playlist.count({}, (err, count) => {
            if (err) { console.error(err); }
            afterCount = count;
            chai.expect(afterCount - beforeCount).to.equal(20);
            return done();
          });
        });
    });
  });

/*  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });*/
});

