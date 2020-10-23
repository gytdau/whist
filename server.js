const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var expressWs = require('express-ws')(app);
var randomWords = require('random-words');
const { v4: uuidv4 } = require('uuid');

var games = {
}
app.get('/game/:id', function (req, res) {
  return res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/', function (req, res) {
  let newId = uuidv4();// randomWords({ exactly: 5, join: '-' });
  games[newId] = {
    players: [],
    game: {},
    teams: [],
  }
  return res.redirect(`/game/${newId}`)
});

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});


app.use(express.static(path.join(__dirname, 'build')));


app.listen(process.env.PORT || 8080);

// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });