var async = require("async");
var request = require("request");
var cheerio = require("cheerio");

// TODO data-livescore-server-url="https://scorebot-secure.hltv.org"

module.exports.getLiveGames = (callback) => {
	request('http://www.hltv.org/matches/', (err, response, body) => {
    if (err) {
      callback(err);
    }
		// TODO - periodic TypeError: Cannot read property 'parent' of undefined
    try {
			var $ = cheerio.load(body);

			var $live_matches = $('.live-match');
	    var results = [];

	    async.each($live_matches, ($m, next) => {
				const $ = cheerio.load($m);
				$('a.a-reset').each((index, element) => {
					const game = {};
					game.status = 'live';
					game.match_url = `http://www.hltv.org${(element.attribs.href)}`;
					game.list_id = element.attribs.href.match(/(\d+)/)[0]; // regex: first string of numbers
					// game.list_id = $('table').attr('id', 'data-livescore-match').data('livescoreMatch'); // superfancy
					game.event_name = $('.event-name').eq(0).text();
					game.match_team1 = $('.team-name').eq(0).text();
					game.match_team2 = $('.team-name').eq(1).text();

					// game.match_team1_id = $('img.logo').attribs.src.match(/(\d+)/)[0];  // TODO. TO HERE.
					results.push(game);
				});
	      next();
	    } // async.each
	    , (err) => {
	      if (err) {
	        callback(err);
	      } else {
	        callback(results);
	      }
	    });
		}
		catch (e) {
			console.log('page unreachable');
			callback(e);
		}
  }); // request

}; // module.exports

module.exports.getUpcomingGames = (callback) => {
	request('http://www.hltv.org/matches/', (err, response, body) => {
    if (err) {
      callback(err);
    }
		try {
	    var $ = cheerio.load(body);
			var $match_days = $('.match-day');
	    var results = [];

	    async.each($match_days, ($d, next) => {
				const $ = cheerio.load($d);
				$('a.upcoming-match').each((index, element) => {
					const game = {};
					game.status = 'upcoming';
					game.match_url = `http://www.hltv.org${(element.attribs.href)}`;
					game.list_id = element.attribs.href.match(/(\d+)/)[0]; // regex: first string of numbers
					game.event_name = $('.event-name').eq(0).text();
					game.display_date = $('.standard-headline').text();
					game.display_time = $('.time').eq(0).text().trim();
					game.utc_timestamp = $('.time').html().trim().match(/(\d+)/)[0];
					// game.time_div = $('.time').html().trim();
					/*
					the time div can be parsed to produce the unix date:
					<div class="time" data-time-format="HH:mm" data-unix="1495576800000">15:00</div>
					*/

					game.match_team1 = $('.team').eq(0).text();
					game.match_team2 = $('.team').eq(1).text();
					// team id's can be found in the .logo src string
					results.push(game);
				});

	      next();
	    } // async.each
	    , (err) => {
	      if (err) {
	        callback(err);
	      } else {
	        callback(results);
	      }
	    });
		}
		catch (e) {
			console.log('page unreachable');
			callback(e);
		}
  }); // request
}; // module.exports
