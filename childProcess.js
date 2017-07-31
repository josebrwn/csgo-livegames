var Livescore = require('./hltv-livescore');
const args = process.argv[2];
var CircularJSON = require('circular-json');
var timers = require('./timers');

var self = this; // 'this', the child process
self.time = 0;
self.interval; // time remaining.
var maxInactive = timers["MAX_INACTIVE"]; // loops
var tick = timers["ALERT_EVERY_LOOP"]; // check every Nth loop. tick < loopEvery / 2
var oldMessage = '';

var currentGames = args.split(',').map(Number).filter(Boolean); // has to be INT array
var finishedGames = [];
const origGames = currentGames;

/*
childProcess asks for list of current game in every loop of the inactivity timer,
Any finished games are removed until current games is empty. then origGames is reported
back to serverParent.
*/


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

      try {
        process.send(origGames + ' inactive time remaining ' + self.time);
      }
      catch (e) {
        console.log('childProcess exiting: error on time remaining', e);
        process.exit(1);
      }

      // request current games
      try {
          process.send('current_games');
      } // request new array of current games.
      catch (e) {
        console.log('childProcess exiting: error on current_games', e);
        process.exit(1);
      }
    }

    if (_s <= 0) {
      try {
          process.send(origGames + ' exiting due to inactivity');
      }
      catch (e) {
        console.log('childProcess exiting: error on exiting', e);
        process.exit(1);
      }
      process.exit(1); // child self-destructs
    }
  }, 1000); // fixed at 1 sec.
};

// new array of current games, expects format '{ "currentGames": [] }'
process.on('message', (msg) => {
  // compare the two arrays, when none is left of the original set, exit.
  try {
    var _arr = JSON.parse(msg);
    finishedGames = leftDisjoin(currentGames, _arr["currentGames"]);
    currentGames = leftDisjoin(currentGames, finishedGames);
  }
  catch (e) {
    console.log('childProcess exiting: error on parse message', e);
    process.exit(1);
  }
  if (currentGames.length === 0) {
    try {
      process.send(origGames + ' exiting, all games finished');
      process.send('process_exit'); // all list_id's may now be removed from childArray
      process.exit(1);
    }
    catch (e) {
      console.log('childProcess exiting: error on finished', e);
      process.exit(1);
    }
  }
  else {
    try {process.send(currentGames + ' still running');}
    catch (e) {
      console.log('childProcess exiting: error on still running', e);
      process.exit(1);
    }
  }
});


try {
  process.send('Launching new child process, currentGames = ' + currentGames);
}
catch (e) {
  console.log('childProcess exiting: error on Launching', e);
  process.exit(1);
}

var live = new Livescore({
  gamesList: currentGames
});

// raw data from socketio-wildcard
live.on('raw', function(data) {
  if (oldMessage != data) {
    try {process.send(CircularJSON.stringify(data, null, 2));}
    catch (e) {
      console.log('childProcess exiting: error on raw message', e);
      process.exit(1);
    }
    oldMessage = data;
    setInactivityTimer(maxInactive);
  }
});

// efficient ES6 function to find difference between 2 arrays
function leftDisjoin(newArr, oldArr) {
  var oldSet = new Set(oldArr);
  return newArr.filter(function(x) { return !oldSet.has(x); });
}
