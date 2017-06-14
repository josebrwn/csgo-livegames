var io = require('socket.io-client');
var patch = require('socketio-wildcard')(io.Manager);

var EE = require('events').EventEmitter;
var inherits = require('util').inherits;

var CONNECTION = 'http://scorebot2.hltv.org'; // https://scorebot-secure.hltv.org port 443
var PORT = 10022;

var self;

function Livescore(options) {
  self = this;

  self.connected = false;
  self.started = false;


  options = options || {};
  self.gamesList = options.gamesList || self.gamesList || null;

  self.url = options.url || CONNECTION;
  self.port = options.port || PORT;

  self.socket = io(self.url + ':' + self.port);
  // piggyback using the event-emitter bundled with socket.io client
  patch(self.socket);

  self._lastLog;

  self.options = {};


  // there are 3 original events: connect, scoreboard, and log.
  // the rest we create and invoke while parsing the log
  self.socket.on('connect', self._onConnect);
};

inherits(Livescore, EE);

Livescore.Enums = require('../Livescore.js').Enums;
Livescore.Classes = require('../Livescore.js').Classes;

// invoked by hltv connect event
Livescore.prototype._onConnect = function() {
  if (!self.connected) {
    self.connected = true;
    // these are the only other hltv events
    // self.socket.on('log', self._onLog);
    self.socket.on('*', self._onReceive); // captures everything

  }

  /*
  readyForMatch expects a single string:
  self.gamesList = '2310804';
  readyForScores expects an integer array:
  self.gamesList = [2310804,13235,2346246,24564564]; TODO test data provider for player lists
  */
  if (self.gamesList) {
    self.socket.emit('readyForScores', self.gamesList);
    // self.emit('debug', self.gamesList);
  }
};

// invoked by hltv connect event
Livescore.prototype._onReceive = function(data) {
  self.emit('raw', data);
};

// invoked by hltv connect event
Livescore.prototype._onLog = function(logs) {
  try {
    logs = JSON.parse(logs).log.reverse();
  } catch (err) {
    logs = null;

    self.emit('debug', err);
  }

  if (logs && logs !== self._lastLog) {
    self.emit('log', logs);

    try {
      if (logs) {
        logs.forEach((log) => {
          var event;

          for (event in log) {
            self.emit('debug', 'received event: ' + event);
          }
        });
      }
    }
    catch (err) {
      self.emit('debug', err);
    }

    self._lastLog = logs;
  }
};

// prototype function. called elsewhere.
Livescore.prototype.setTime = function(time) {
  clearInterval(self.interval);
  self.time = time;
  self.emit('clock', self.time);
  self.interval = setInterval(() => {
    var _s;
    self.time = self.time - 1;
    _s = Number(self.time);
    if (_s % 5 === 0 && _s > -1) {
      self.emit('time', self.time);
    }
  }, 1000);
};

// prototype function. called elsewhere.
Livescore.prototype.getTime = function(callback) {
  callback(self.time);
};


module.exports = Livescore;
