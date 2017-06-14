const livegames = require('./hltv-live-games');
var gamesArray = [];
var gamesList = '';
var Livescore = require('./hltv-livescore');
var CircularJSON = require('circular-json');

livegames.getLiveGames((games, err) => {

	if (err) {
		console.log(err);
	}
	else {
		console.log(games);
		games.forEach(function(element) {
				gamesArray.push(parseInt(element.list_id,10)); // must be int
		});
	}

	if (gamesArray.length === 0) {
		console.log('no live games');
		return;
	}

  // convert gamesList as a comma delimited list and send it to the socket
	gamesList = gamesArray.join(",");
  // console.log(gamesList);
  var live = new Livescore({
    gamesList: gamesArray
  });


  // raw data from socketio-wildcard
  live.on('raw', function(data) {
    console.log(CircularJSON.stringify(data, null, 2));
  });

});
