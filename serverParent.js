// 'use strict'; // PROBLEM! TODO

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const timers = require('./timers');
const livegames = require('./hltv-live-games');
const Livescore = require('./hltv-livescore');
const cp = require('child_process');
const request = require("request");
const CircularJSON = require('circular-json');

const lg = io.of('/livegames');

var oldGames = []; // the previous run's currentGames
var childArray = []; // the list_id's currently running in child processes
var currentGamesJSON = '{ "currentGames": [] }'; // broadcast to all children
var loopEvery = timers["LOOP_EVERY_MS"]; // ms. childProcess ticks must be less than half this value.
var nextInterval = timers["WAIT_MS"];

// PM2 env vars
var api_url = process.env.API_URL || 'http://jsonplaceholder.typicode.com/posts';
var port = process.env.PORT || 3001;

var options = {
    method: 'POST',
    url: api_url,
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    },
    timeout: timers["TIMEOUT_MS"] // default is 120000
};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
http.listen(port, function(){
  console.log('listening on *:'+port);
  console.log('environment', process.env.NODE_ENV);
  console.log('API_URL', api_url);
});

function scrapeMatchPage() {
  setTimeout(function  () {
    livegames.getLiveGames((games, err) => {
      if (err) {
        console.log('WARNING', currentTime(), err);
        return; // oldGames remains fixed
      }
      else {
        var newGames = [];
        var currentGames = [];
        var finishedGames = [];
        if (games instanceof Array) {
          try {
            games.forEach(function(element) {
              currentGames.push(parseInt(element.list_id,10)); // must be int
            });
          }
          catch (e) {
            console.log('WARNING', currentTime(), e);
            return; // oldGames remains fixed
          }
        }
        else {
          console.log('WARNING', currentTime(), 'games: ', games);
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
      console.log('child array', childArray);
      console.log('connected users:', Object.keys(io.sockets.sockets));

      /*
        post newGames to the API
      */
      if (newGames.length > 0) {
        var newGamesJSON = '{ "newGames": [' + newGames + '] }';

        options.body = newGamesJSON;
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

      /*
        post finishedGames to the API
      */
      if (finishedGames.length > 0) {
        var finishedGamesJSON = '{ "finishedGames": [' + finishedGames + '] }';

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


      /*
        post livescores to the API
      */
      if (newGames.length > 0) {
        const diff = leftDisjoin(newGames, childArray); // prevent double launch
        if (diff.length > 0) {
          childArray = childArray.concat(diff);
          console.log('child array', childArray);
          const child = cp.fork(__dirname+'/childProcess.js', [diff]);
          // The only events you can receive from the child process are error, exit, disconnect, close, and message.
          child.on('message', function(data) {
            if (data === 'current_games') {
                child.send(currentGamesJSON); // child requests list of current games
            }
            else if (data === 'process_exit') {
              console.log('PROCESS EXIT', diff); // expect diff to be the const it was at launch
              childArray = leftDisjoin(childArray, diff);
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
                    if (body === '"OK"' || body.indexOf('"ReturnCode":-1') > 0 || !IsJsonString(body) ) { // hide misc errors from the client
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
          }); // child.on
        } // if diff
      } // if newGames
      oldGames = currentGames; // always reset oldGames
    }); // getLiveGames

    // immediately reset after first run
    if (nextInterval < loopEvery) {
      nextInterval = loopEvery;
      scrapeMatchPage();
    }
    // nextInterval is variable
    else {
      scrapeMatchPage();
      nextInterval = loopEvery;
    }
  }, nextInterval); // trigger an ECONNRESET here, set very short or undefined.
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
// the current UTC date and time. NB: HLTV is on Central European Time (CET or CEDT).
var currentTime = () => {
  _time = new Date().toISOString().
  replace(/T/, ' ').    // replace T with a space
  replace(/\..+/, '');
  return _time;
};
