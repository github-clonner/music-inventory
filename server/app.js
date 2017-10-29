// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
// https://expressjs.com/en/advanced/best-practice-performance.html
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const playlists = require('../api/playlists.js');
const change = require('../api/change.js');

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

/*app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

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

  // });
});

module.exports = app;

/*curl -d "playlistID=1&remove=59f12247683c69928365c429&add=59f12408cc228b92a2f12a0f" -X POST http://localhost:8000/change
*/