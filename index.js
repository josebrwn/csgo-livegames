const livegames = require('./hltv-live-games');
var logging = require('./logging');
var Livescore = require('./hltv-livescore');
var CircularJSON = require('circular-json');
var cp = require('child_process');
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
		// find any new listid's
		newGames = leftDisjoin(currentGames, oldGames);
		finishedGames = leftDisjoin(oldGames, currentGames);
		console.log ('current games:', currentGames);
		console.log('old games:', oldGames);
		console.log('new games:', newGames);
		console.log('finished games:', finishedGames);
		// send any new games to a newly spawned child process
		if (newGames.length > 0) {
			// fork the child process
			var child = cp.fork('./childProcess.js', [newGames]);
			// The only events you can receive from the child process are error, exit, disconnect, close, and message.
      child.on('message', function(data) {
        try {
          var dataStr = CircularJSON.stringify(data, null, 2);
          console.log(data);
        }
        catch (err) {console.log(err);}
      });
		}
		oldGames = currentGames; // always reset oldGames
	}); // getLiveGames
} // scrapeMatchPage

scrapeMatchPage();
setInterval(scrapeMatchPage,loopEvery);

// efficient ES6 function to find difference between 2 arrays
function leftDisjoin(newArr, oldArr) {
  var oldSet = new Set(oldArr);
  return newArr.filter(function(x) { return !oldSet.has(x); });
}
