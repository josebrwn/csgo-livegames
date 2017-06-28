var Livescore = require('./hltv-livescore');
const args = process.argv[2];
var CircularJSON = require('circular-json');
var self = this; // 'this', the child process
self.time = 0;
self.interval; // time remaining.
var maxInactive = 1800; // TODO is this sufficient?
var tick = 300; // remaining inactive alert

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
      // console.log(newGames, ' inactive time remaining ', self.time);
      process.send(newGames + ' inactive time remaining ' + self.time);
    }
    if (_s <= 0) {
      // console.log(newGames, 'exiting due to inactivity');
      process.send(newGames + ' exiting due to inactivity');
      throw new Error('exiting'); // child self-destructs
    }
  }, 1000);
};

// console.log('Launching new child process, newGames = ', newGames);
process.send('Launching new child process, newGames = ' + newGames);

var live = new Livescore({
  gamesList: newGames
});

// raw data from socketio-wildcard
live.on('raw', function(data) {
  // console.log(CircularJSON.stringify(data, null, 2));
	process.send(CircularJSON.stringify(data, null, 2));
  setInactivityTimer(maxInactive);
});
