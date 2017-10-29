// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
// https://expressjs.com/en/advanced/best-practice-performance.html
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const playlists = require('../api/playlists.js');
const change = require('../api/change.js');
const search = require('../api/search.js');

/* TODO require logging tools, compression?
var log4js = require("log4js");
var morgan = require("morgan");
var compression = require('compression') */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res, next) {
  res.send('hi there');
  console.log('hi there console');
});

app.listen(8000, () => {
  console.log('app listening at port 8000');
});

console.log('Server running at http://127.0.0.1:8000/');

app.get('/playlists', (req, res) => {
  playlists.getAllPlaylists((data) => {
    res.send(data);
  });
});

app.post('/change', (req, res) => {
  if ('playlistID' in req.body) {
    change(req.body, (result) => {
      res.end(`It worked!!!${result}\n`);
    });
  } else {
    res.end('playlistID key not found. \n?');
  }
});

app.post('/search', (req, res) => {
  console.log('artist search received', req.body);
  if ('artist' in req.body) {
    search.artist(parseInt(req.body.artist, 10), (result) => {
      res.send(result);
    });
  }
  if ('title' in req.body) {
    console.log('title search rcvd', req.body);
    search.title(req.body.title, (result) => {
      console.log('call me maybe?');
      console.log('result is : ', result);
      res.send(result);
    });
  } else {
    res.end(`${((req.body.title))} ? I got nothing. Sry\n`);
  }
});

module.exports = app;

/* test example
curl -d "playlistID=1&remove=59f12247683c69928365c429&add=59f12408cc228b92a2f12a0f" -X POST http://localhost:8000/change
curl -d "title=distortional" -X POST http://localhost:8000/search
curl -d "artist=266770" -X POST http://localhost:8000/search

*/
