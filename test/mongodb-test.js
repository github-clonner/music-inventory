const mongoose = require('mongoose');
const chai = require('chai');
const Song = require('../db-mongo-music/Songs.js');
const path = require('path');
const makeMusic = require('../data-source/music-maker.js');
const makeMongoData = require('../db-mongo-music/load-mongo-music.js');

// run tests with NODE_ENV=test to use test DB (see script in package.json)
const config = require('config');
const database = config.get('MONGO_DATABASE');

describe('Mongo Test Database', () => {
  before((done) => {
  // make a temporary db
    mongoose.connect(database, {
      useMongoClient: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongo db connection error'));
    db.once('open', () => {
      done();
    });
  });
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
      if (err) return console.error('error saving to mongoDB', err);
      chai.expect(data.title).to.equal('Test Song');
      return 'string to make the linter happy';
    });
  });
  it('should generate and add 5 songs to mongoDB', () => {
    Song.insertMany(makeMusic(5))
      .then((stuff) => {
        chai.expect(stuff).to.have.lengthOf(5);
      })
      .catch(err => console.log(err));
  });
  console.log(makeMongoData.makeThousands(1)); // ->promise


  it('should add 1000 songs to mongoDB', () => {

    makeMongoData.makeThousands(1)
    .then((thousandSongs) => {
      Song.insertMany(thousandSongs)
      .then((stuff) => {
        console.log(stuff);
        chai.expect(stuff).to.have.lengthOf(10);
      })
      .catch(err => console.log(err));
      
    });

  });
/*  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      //mongoose.connection.close(done);
    });
  });*/
});

