var async = require("async");
var request = require("request");
var cheerio = require("cheerio");

// always true? foo(true, (err, bar) => {});
module.exports = (secondary, callback) => {
	if (typeof secondary === 'function') {
		callback = secondary;
		secondary = false;
	}

	request('http://www.hltv.org/matches/', (err, response, body) => {

	  if (err || response.statusCode !== 200) {
	    callback(new Error(`Request failed: ${response.statusCode}`));
	  }
		// else {}
    var $ = cheerio.load(body);
		var $matches = $('.matchListBox').toArray();
		var updated = []; // this is the array that gets returned

    async.each($matches, (match, next) => {
      var game = {};
      var $b = cheerio.load(match);

			switch($b('.matchTimeCell').text()) {
	      case 'Finished':
	        game.status = 'finished';
	        break;
	      case 'LIVE':
	        game.status = 'live';
	        break;
	      default:
	        game.status = 'upcoming';
      }

			// game.format = parseInt($b('.matchScoreCell').text().match(/Best of ([0-9]*)/)[1]);
      game.link = `http://www.hltv.org${$b('.matchActionCell').html().match(/"(.*)"/)[1]}`;
      game.teams = [
        $b('.matchTeam1Cell').text().trim(),
        $b('.matchTeam2Cell').text().trim()
      ];

			updated.push(game);
			next();
			// if (secondary) {
			// 	request(game.link, (err, response, body) => {
			// 		if (err || response.statusCode !== 200) {
			// 	    next(new Error(`Request failed: ${response.statusCode}`));
			// 	  }
			// 		// else {}
			// 		var $c = cheerio.load(body);
			// 		// game.time = new Date(parseInt(body.match(/date: "([0-9]*)"/m)[1]));
			// 		game.players = $c('span[style*="font-size:12px"]').toArray().map((player) => {
			// 			return $c(player).text();
			// 		});
			// 		updated.push(game);
			// 		next();
			//
			// 	}); // request
			// } // secondary
			// else {
			// 	updated.push(game);
			// 	next();
			// }

    } // async.each
		, (err) => {
			if (err) {
				callback(err);
			} else {
				callback(updated);
			}
		});

	}); // request
}; // module.exports
