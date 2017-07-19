var Livescore = require('./hltv-livescore');
const args = process.argv[2];
var CircularJSON = require('circular-json');
var self = this; // 'this', the child process
self.time = 0;
self.interval; // time remaining.
var maxInactive = 900; // 2017-07-19 changed to 15 min.
var tick = 300; // remaining inactive alert
var oldMessage = '';

const newGames = args.split(',').map(Number).filter(Boolean); // has to be INT array

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
      try {process.send(newGames + ' inactive time remaining ' + self.time);}
      catch (e) {console.log(newGames + ' inactive time remaining ' + self.time);}
    }
    if (_s <= 0) {
      try {process.send(newGames + ' exiting due to inactivity');}
      catch (e) {console.log(newGames + ' exiting due to inactivity');}
      throw new Error('exiting'); // child self-destructs
    }
  }, 1000);
};

try {process.send('Launching new child process, newGames = ' + newGames);}
catch (e) {console.log('Launching new child process, newGames = ' + newGames);}

var live = new Livescore({
  gamesList: newGames
});

// raw data from socketio-wildcard
live.on('raw', function(data) {
  if (oldMessage != data) {
    try {process.send(CircularJSON.stringify(data, null, 2));}
    catch (e) {console.log(CircularJSON.stringify(data, null, 2));}
    oldMessage = data;
    setInactivityTimer(maxInactive);
  }
});
