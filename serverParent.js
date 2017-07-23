// 'use strict'; // PROBLEM! TODO

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); // use io.close() to disconnect all users dynamically
var lg = io.of('/livegames');

const livegames = require('./hltv-live-games');
var Livescore = require('./hltv-livescore');
var cp = require('child_process');
var request = require("request");
var CircularJSON = require('circular-json');

var newGames = [];
var oldGames = [];
var currentGames = [];
var finishedGames = [];
var currentGamesJSON = '{ "currentGames": [] }'; // broadcast to all children

var loopEvery = 180000; // ms
var nextInterval = 0;

/*
  avoid running simultaneously from multiple servers when connected to the API
*/
var options = {
    method: 'POST',
    // url: 'http://jsonplaceholder.typicode.com/posts', // dummy
    // url: '***REMOVED***', // local
    // url: '***REMOVED***', // staging
    url: '***REMOVED***', // production
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    },
    timeout: 10000 // 10 seconds. default is 120000
};

// the current UTC date and time. NB: HLTV is on Central European Time (CET or CEDT).
var currentTime = () => {
  _time = new Date().toISOString().
  replace(/T/, ' ').    // replace T with a space
  replace(/\..+/, '');
  return _time;
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
http.listen(3001, function(){
  console.log('listening on *:3001');
  console.log(process.env.NODE_ENV);
});

function scrapeMatchPage() {
  setTimeout(function  () {
    livegames.getLiveGames((games, err) => {
      if (err) {
        console.log('WARNING', currentTime(), err);
        nextInterval = nextInterval * 2;
        return; // oldGames remains fixed
      }
      else {
        currentGames = [];
        newGames = [];
        finishedGames = [];
        if (games instanceof Array) { // theory, err is called back, not parseable
          try {
            games.forEach(function(element) {
              currentGames.push(parseInt(element.list_id,10)); // must be int
            });
          }
          catch (e) {
            console.log('WARNING', currentTime(), e);
            nextInterval = nextInterval * 2;
            return; // oldGames remains fixed
          }
        }
        else {
          console.log('WARNING', currentTime(), 'games: ', games);
          nextInterval = nextInterval * 2;
          return; // oldGames remains fixed
        }
      }
      newGames = leftDisjoin(currentGames, oldGames);
      finishedGames = leftDisjoin(oldGames, currentGames);
      currentGamesJSON = '{ "currentGames": [' + currentGames + '] }';
      console.log(currentTime());
      console.log ('current games:', currentGames);
      lg.emit('msg_to_client', currentGamesJSON);

      if (currentGames.length === 0 && finishedGames.length === 0) {
        oldGames = currentGames; // always reset oldGames
        return;
      }

      console.log('old games:', oldGames);
      console.log('new games:', newGames);
      console.log('finished games:', finishedGames);
      console.log('connected users:', Object.keys(io.sockets.sockets));

      /*
        post newGames to the API
      */
      if (newGames.length > 0) {
        var newGamesJSON = '{ "newGames": [' + newGames + '] }';
        if (IsJsonString(newGamesJSON)) {
          options.body = newGamesJSON;
          console.log(newGamesJSON);
          lg.emit('msg_to_client', newGamesJSON);
          request(options, function(error, response, body) {
            if (error) {
              console.log('WARNING', error);
            }
            else {
              if (body !== '"OK"') {
                var bodyJson = CircularJSON.parse(body);
                console.log(CircularJSON.stringify(bodyJson));
                if (bodyJson["Message"] === null) {
                  lg.emit('msg_to_client', CircularJSON.stringify(bodyJson));
                }
              }
              else {
                console.log(body);
              }
            }
          });
        }
        else {
          console.log('WARNING', newGamesJSON);
        }
      }

      /*
        post finishedGames to the API
      */
      if (finishedGames.length > 0) {
        var finishedGamesJSON = '{ "finishedGames": [' + finishedGames + '] }';
        if (IsJsonString(finishedGamesJSON)) {
          options.body = finishedGamesJSON;
          lg.emit('msg_to_client', finishedGamesJSON);
          request(options, function(error, response, body) {
            if (error) {
              console.log('WARNING', error);
            }
            else {
              if (body !== '"OK"') {
                var bodyJson = CircularJSON.parse(body);
                console.log(CircularJSON.stringify(bodyJson));
                if (bodyJson["Message"] === null) {
                  lg.emit('msg_to_client', CircularJSON.stringify(bodyJson));
                }
              }
              else {
                console.log(body);
              }
            }
          });
        }
        else {
          console.log('WARNING', finishedGamesJSON);
        }
      }
      else {
        finishedGamesJSON = '{ "finishedGames": [] }';
      }

      /*
        post livescores to the API
      */
      if (newGames.length > 0) {
        var child = cp.fork('./childProcess.js', [newGames]);
        // The only events you can receive from the child process are error, exit, disconnect, close, and message.
        child.on('message', function(data) {
          if (data === 'current_games') {
            child.send(currentGamesJSON); // child requests list of current games
          }
          else {
            if (IsJsonString(data)) {
              data = data.replace(/de_cbble/g, 'de_cobblestone'); // HACK this is also handled in csgomapslookup
              options.body = data;
              data = CircularJSON.parse(data); // condensed but not truncated
              console.log(CircularJSON.stringify(data));
              lg.emit('msg_to_client', CircularJSON.stringify(data));
              request(options, function(error, response, body) {
                if (error) {
                  console.log('WARNING', error);
                }
                else {
                  if (body === '"OK"' || body.indexOf('"ReturnCode":-1') > 0 ) { // hide misc errors from the client
                    console.log(body);
                  }
                  else {
                    var bodyJson = CircularJSON.parse(body);
                    console.log(CircularJSON.stringify(bodyJson));
                    lg.emit('msg_to_client', CircularJSON.stringify(bodyJson));
                  }
                }
              });
            }
            else {
              console.log('INFORMATION', data);
            }
          }
        });
      }
      oldGames = currentGames; // always reset oldGames
    });

    // immediately reset after first run
    if (nextInterval < loopEvery) {
      nextInterval = loopEvery;
      scrapeMatchPage();
    }
    else {
      scrapeMatchPage();
      nextInterval = loopEvery;
    }
  }, nextInterval);
}

scrapeMatchPage();

lg.on('connection', function(socket){
  console.log( 'User ' + socket.id + ' connected' );
  socket.on('disconnect', function(){
    console.log( 'User ' + socket.id + ' disconnected');
  });
});

// efficient ES6 function to find difference between 2 arrays
function leftDisjoin(newArr, oldArr) {
  var oldSet = new Set(oldArr);
  return newArr.filter(function(x) { return !oldSet.has(x); });
}

// the API probably expects well-formed JSON
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
