// 'use strict'; // PROBLEM! TODO

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); // use io.close() to disconnect all users dynamically

const livegames = require('./hltv-live-games');
var Livescore = require('./hltv-livescore');
var cp = require('child_process');
var request = require("request");
var options = {
    method: 'POST',
    url: 'http://jsonplaceholder.typicode.com/posts',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json'
    }
};

// create a namespace for livegames:
var lg = io.of('/livegames');

// start the server
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
http.listen(3001, function(){
  console.log('listening on *:3001');
});


var newGames = [];
var oldGames = [];
var currentGames = [];
var loopEvery = 60000; // 1 minute

function scrapeMatchPage() {
	livegames.getLiveGames((games, err) => {
		if (err) {
			console.log(err);
		}
		else {
			currentGames = [];
			newGames = [];
			finishedGames = [];
			// console.log(games);
			games.forEach(function(element) {
					currentGames.push(parseInt(element.list_id,10)); // must be int
			});
		}
		if (currentGames.length === 0) {
			console.log('no live games');
			oldGames = currentGames; // always reset oldGames
			return;
		}
		newGames = leftDisjoin(currentGames, oldGames);
		finishedGames = leftDisjoin(oldGames, currentGames);
		console.log ('current games:', currentGames);
		console.log('old games:', oldGames);
		console.log('new games:', newGames);
		console.log('finished games:', finishedGames);

		/*
			post newGames to the API
		*/
    if (newGames.length > 0) {
  		var newGamesJSON = '{ "newGames": [' + newGames + '] }';
  		if (IsJsonString(newGamesJSON)) {
  			options.body = newGamesJSON;
  			request(options, function(error, response, body) {
  					if (error) throw new Error(error);
  					console.log(body);
            lg.emit('msg_to_client', newGamesJSON); // broadcast to all sockets

  			});
  		}
  		else {
  			console.log('WARNING', newGamesJSON);
  		}
    }
    /*
			post finishedGames to the API
		*/
    if (newGames.length > 0) {
  		var finishedGamesJSON = '{ "finishedGames": [' + finishedGames + '] }';
  		if (IsJsonString(finishedGamesJSON)) {
  			options.body = finishedGamesJSON;
  			request(options, function(error, response, body) {
  					if (error) throw new Error(error);
  					console.log(body);
            lg.emit('msg_to_client', finishedGamesJSON); // broadcast to all sockets

  			});
  		}
  		else {
  			console.log('WARNING', newGamesJSON);
  		}
    }
		// TODO is a child process sometimes forked twice because of timing issues?

		// send any new games to a newly spawned child process
		if (newGames.length > 0) {
			// fork the child process
			var child = cp.fork('./childProcess.js', [newGames]);
			// The only events you can receive from the child process are error, exit, disconnect, close, and message.
      child.on('message', function(data) {

				/*
					post livescores to the API
				*/
				if (IsJsonString(data)) {
					options.body = data;
					request(options, function(error, response, body) {
							if (error) throw new Error(error);
							console.log(body); // response from the API
              lg.emit('msg_to_client', data); // broadcast to all sockets

					});
				}
				else {
					console.log('INFORMATION', data);
				}
      });
		}
		oldGames = currentGames; // always reset oldGames
	}); // getLiveGames
} // scrapeMatchPage

// main entry point: execute the scraper immediately, repeat every N seconds
scrapeMatchPage();
setInterval(scrapeMatchPage,loopEvery);

lg.emit('msg_to_client', 'body'); // broadcast to all sockets
lg.on('connection', function(socket){
  lg.emit('msg_to_client', 'User ' + socket.id + ' connected'); // broadcast to all sockets
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
