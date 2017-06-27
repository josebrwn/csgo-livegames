const livegames = require('./hltv-live-games');
var newGames = [];
var oldGames = [];
var gamesList = '';
var Livescore = require('./hltv-livescore');
var CircularJSON = require('circular-json');
var loopEvery = 60000; // 1 minute
var t;
var cp = require('child_process');

function scrapeMatchPage() {
	livegames.getLiveGames((games, err) => {
		if (err) {
			console.log(err);
		}
		else {
			newGames = [];
			// console.log(games);
			games.forEach(function(element) {
					newGames.push(parseInt(element.list_id,10)); // must be int
			});
		}

		// // for testing, manually add a new game. vary conditions for different effects
		// if (1==1) {
		// 	newGames.push(2311427);
		// 	newGames.push(2311989);
		// }

		if (newGames.length === 0) {
			console.log('no live games');
			oldGames = [];
			return;
		}

		// find any new listid's
		t = currentTime();
		console.log(t);
		console.log ('current games:', newGames);
		console.log('old games:', oldGames);
		newGames = difference(newGames, oldGames);
		console.log('new games:', newGames);
		// send any new games to a newly spawned child process
		if (newGames.length > 0) {
			oldGames = newGames;
			gamesList = newGames.join(",");
			// fork the child process
			var child = cp.fork('./childProcess.js', [newGames]);
		}
	}); // getLiveGames
} // scrapeMatchPage

scrapeMatchPage();
setInterval(scrapeMatchPage,loopEvery);

// efficient ES6 function to find difference between 2 arrays
function difference(newArr, oldArr) {
  var oldSet = new Set(oldArr);
  return newArr.filter(function(x) { return !oldSet.has(x); });
}

// the current UTC date and time. Winston does this for you in console logs.
var currentTime = () => {
  _time = new Date().toISOString().
  replace(/T/, ' ').    // replace T with a space
  replace(/\..+/, '');
  return _time;
};
