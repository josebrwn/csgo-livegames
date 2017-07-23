var Livescore = require('./hltv-livescore');
const args = process.argv[2];
var CircularJSON = require('circular-json');
var self = this; // 'this', the child process
self.time = 0;
self.interval; // time remaining.
var maxInactive = 3600; // loops
var tick = 90; // check every Nth loop. tick * timer < loopEvery / 2
var timer = 1000; // ms
var oldMessage = '';

var currentGames = args.split(',').map(Number).filter(Boolean); // has to be INT array
var finishedGames = [];
const origGames = currentGames;

// call this whenever something happens. emit periodically. if inactive, exits.
var setInactivityTimer = function(time) {
  clearInterval(self.interval);
  self.time = time;
  // "Infinite Loop" Execution ~ setInterval().
  self.interval = setInterval(() => {
    var _s;
    self.time = self.time - 1;
    _s = Number(self.time);
    if (_s % tick === 0 && _s > -1) {

      try {process.send(origGames + ' inactive time remaining ' + self.time);}
      catch (e) {console.log(e);}

      // request current games
      try {process.send('current_games');} // request new array of current games.
      catch (e) {console.log(e);}
    }

    if (_s <= 0) {
      try {process.send(origGames + ' exiting due to inactivity');}
      catch (e) {console.log(e);}
      process.exit(1); // child self-destructs
    }
  }, timer);
};

// new array of current games, expects format '{ "currentGames": [] }'
process.on('message', (msg) => {
  // compare the two arrays, when none is left of the original set, exit.
  try {
    var _arr = JSON.parse(msg);
    finishedGames = leftDisjoin(currentGames, _arr["currentGames"]);
    currentGames = leftDisjoin(currentGames, finishedGames);
  }
  catch (e) {console.log(e);}
  if (currentGames.length === 0) {
    try {process.send(origGames + ' exiting, all games finished');}
    catch (e) {console.log(e);}
    process.exit(1); // child self-destructs
  }
  else {
    try {process.send(currentGames + ' still running');}
    catch (e) {console.log(e);}
  }
});


try {process.send('Launching new child process, currentGames = ' + currentGames);}
catch (e) {console.log(e);}

var live = new Livescore({
  gamesList: currentGames
});

// raw data from socketio-wildcard
live.on('raw', function(data) {
  if (oldMessage != data) {
    try {process.send(CircularJSON.stringify(data, null, 2));}
    catch (e) {console.log(e);}
    oldMessage = data;
    setInactivityTimer(maxInactive);
  }
});

// efficient ES6 function to find difference between 2 arrays
function leftDisjoin(newArr, oldArr) {
  var oldSet = new Set(oldArr);
  return newArr.filter(function(x) { return !oldSet.has(x); });
}
