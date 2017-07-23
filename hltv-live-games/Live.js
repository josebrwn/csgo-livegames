var async = require("async");
var request = require("request");
var cheerio = require("cheerio");
var url = 'https://www.hltv.org/matches'; // hltv must include https and www

module.exports.getLiveGames = (callback) => {
  request(url, (err, response, body) => {
    if (err) {
      // { [Error: socket hang up] code: 'ECONNRESET' }
      // https://stackoverflow.com/questions/17245881/node-js-econnreset/17637900
      // HACK
      if (err.code === 'ECONNRESET') {
        console.log('ERROR', 'ECONNRESET detected!');
        throw new Error('exiting'); // parent self-destructs
      }
      else {
        console.log('WARNING', 'request: ', err);
        callback();
      }
    }

    try {
      if(body) {
        var $ = cheerio.load(body);
        var $live_matches = $('.live-match');
        var results = [];
        async.each($live_matches, ($m, next) => {
          const $ = cheerio.load($m);
          $('a.a-reset').each((index, element) => {
            const game = {};
            game.status = 'live';
            game.match_url = `https://www.hltv.org${(element.attribs.href)}`;
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
            console.log('WARNING', 'async: ', err);
            callback();
          } else {
            callback(results);
          }
        });
      }
      else {
          // body is null or empty; allow the empty result so that it can be handled.
          console.log('WARNING', 'cheerio: body is null or empty');
          callback();
      }

    }
    catch (e) {
      console.log('WARNING', 'cheerio: ', err);
      callback();
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
      console.log(e);
      callback(e);
    }
  }); // request
}; // module.exports
