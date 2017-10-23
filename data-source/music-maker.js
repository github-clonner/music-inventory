// produce dummy data as if new music were being sent to system
// output will be an array of song
const fs = require('fs');
const mongoose = require('mongoose');
const Song = require('../db-mongo-music/Songs.js');
const wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf-8')
  .split('\n');
// TODO get previous count from DB to create an integer counter
let previousId = 0;

// pick 1 - 3 words to be song title
const pickRandWords = function () {
  const output = [];
  const makeRndIndex = function () {
    return Math.floor(Math.random() * (wordArray.length));
  };
  for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j += 1) {
    output.push(wordArray[makeRndIndex()]);
  }
  return output.join(' ');
};
// number should be less than 1001
const makeMusic = function (number, iteration = 1) {
  const newSongs = [];
  for (let i = 0; i < number; i += 1) {
    const song = new Song({
      _id: new mongoose.Types.ObjectId(), // hmmm
      intId: (previousId * iteration) + 1,
      title: pickRandWords(),
      artist: pickRandWords(), // TODO need 100,000 names
      // made songGenre an array to allow future expansion to multiple song categories
      songGenre: [Math.floor(Math.random() * 21) + 1],
      length: Math.floor(Math.random() * 5000) + 5,
      album: pickRandWords(), // TODO need a million albums
      year: Math.floor(Math.random() * 100) + 1917
    });
    newSongs.push(song);
    previousId += 1;
  }
  return newSongs;
};

/* const testArr = makeMusic(3);
console.log(testArr); */

module.exports = makeMusic;
