// 'use strict'; // PROBLEM! TODO

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cp = require('child_process');
const request = require("request");
const CircularJSON = require('circular-json');
const twit = require('twit');

const livegames = require('./hltv-live-games');
const Livescore = require('./hltv-livescore');
const timers = require('./timers');
const tools = require('./tools');
const config = require('./config.js');

const lg = io.of('/livegames');

const api_url = process.env.API_URL || 'http://jsonplaceholder.typicode.com/posts';
const port = process.env.PORT || 3001;
const options = {
    method: 'POST',
    url: api_url,
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    },
    timeout: timers["TIMEOUT_MS"] // default is 120000
};
const loopEvery = timers["LOOP_EVERY_MS"]; // ms. childProcess ticks must be less than half this value.

var nextInterval = timers["WAIT_MS"];
var oldGames = []; // the previous run's currentGames
var childArray = []; // the list_id's currently running in child processes
var currentGamesJSON = '{ "currentGames": [] }'; // broadcast to all children
var gameStatusJSON='';

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
        console.log('WARNING', tools.currentTime(), err);
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
            console.log('WARNING', tools.currentTime(), e);
            return; // oldGames remains fixed
          }
        }
        else {
          console.log('WARNING', tools.currentTime(), 'games: ', games);
          return; // oldGames remains fixed
        }
      }
      newGames = tools.leftDisjoin(currentGames, oldGames);
      finishedGames = tools.leftDisjoin(oldGames, currentGames);
      currentGamesJSON = JSON.stringify({ "currentGames": currentGames });
      console.log(tools.currentTime());
      console.log ('current games:', currentGames);
      lg.emit('msg_to_client', currentGamesJSON);

      if (currentGames.length === 0 && finishedGames.length === 0) {
        oldGames = currentGames; // always reset oldGames
        return;
      }

      console.log('old games:', oldGames);
      console.log('new games:', newGames);
      console.log('finished games:', finishedGames);
      console.log('child array:', childArray);
      console.log('connected users:', Object.keys(io.sockets.sockets));

      /*
        post changes in game status to the API
      */
      if (newGames.length > 0) {
        gameStatusJSON = JSON.stringify({ "newGames": newGames });
        postStatusChange(gameStatusJSON);
      }
      if (finishedGames.length > 0) {
        gameStatusJSON = JSON.stringify({ "finishedGames": finishedGames });
        postStatusChange(gameStatusJSON);
      }

      /*
        post livescores to the API
      */
      if (newGames.length > 0) {
        const diff = tools.leftDisjoin(newGames, childArray); // prevent double launch

        if (diff.length > 0) {
          childArray = childArray.concat(diff);
          console.log('child array:', childArray);
          const child = cp.fork(__dirname+'/childProcess.js', [diff]);
          // The only events you can receive from the child process are error, exit, disconnect, close, and message.
          child.on('message', function(data) {

            // child requests list of current games
            if (data === 'current_games') {
                child.send(currentGamesJSON);
            }
            // child self-destructs
            else if (data === 'process_exit') {
              childArray = tools.leftDisjoin(childArray, diff); // ref. to `diff` persists for the life of the child
              console.log('child array:', childArray);
            }
            // hltv emits message
            else if (tools.IsJsonString(data)) {
              data = data.replace(/de_cbble/g, 'de_cobblestone'); // HACK this is also handled in csgomapslookup
              var dataJSON = CircularJSON.parse(data); // condensed but not truncated
              var _s = CircularJSON.stringify(dataJSON);
              // omit junk records
              if (_s.toString().indexOf('"mapScores":{}') > 0 ) {
                console.log('DEBUG', tools.currentTime());
              }
              else {
                console.log(_s);
                postStatusChange(data);
              }
            }
            else {
              console.log('INFORMATION', data);
            }
          });
        }
      }

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

// post a status change to the API
function postStatusChange (jsonVal) {
  options.body = jsonVal;
  lg.emit('msg_to_client', jsonVal);
  request(options, function(error, response, body) {
    if (error) {
      console.log('WARNING', error);
    }
    else {
      if (body === '"OK"' ) { // hide from client
        console.log(body);
      }
      else if (body.indexOf('"ReturnCode":-1') > 0 || !tools.IsJsonString(body)) {
        console.log('WARNING', body);
      }
      else {
        var bodyJson = CircularJSON.parse(body);
        console.log(CircularJSON.stringify(bodyJson));
        body = body.replace(/,/g, ', ');
        lg.emit('msg_to_client', body);
        if (process.env.NODE_ENV === 'production') {
          tools.sendTweet(body);
        }
      }
    }
  });
}

function postToTwitter (msg) {
  const T = new twit(config);

  var tweet = '';
  /*
  need to parse the good bits
  list_id, team1_id, team2_id, odds t1, odds ....?
  */

  T.post('statuses/update', { status: tweet }, function(err, data, response) {
  console.log(CircularJSON.stringify(data)["text"]);
  });

}
