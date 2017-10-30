const playlistGenre = [
  {
    number: 1,
    name: 'Rock and Roll'
  },
  {
    number: 2,
    name: 'Folk'
  },
  {
    number: 3,
    name: 'Country Western'
  },
  {
    number: 4,
    name: 'Classical'
  },
  {
    number: 5,
    name: 'Reggaeton'
  },
  {
    number: 6,
    name: 'Jazz'
  },
  {
    number: 7,
    name: 'Mixed'
  },
  {
    number: 8,
    name: 'Blues'
  },
  {
    number: 9,
    name: 'Disco'
  },
  {
    number: 10,
    name: 'Metal'
  }
];
// lookup playlist name by number
//  0 < genNum < 11
playlistGenre.lookup = genNum =>
  playlistGenre.filter(v =>
    v.number === genNum)[0].name;

module.exports = playlistGenre;
