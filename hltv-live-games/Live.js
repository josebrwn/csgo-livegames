var async = require("async");
var request = require("request");
var cheerio = require("cheerio");
var url = 'https://www.hltv.org/matches'; //  hltv must include https and www

module.exports.getLiveGames = (callback) => {
  request({ uri: url, timeout: 1500 }, (err, response, body) => { // https://github.com/request/request
    if (err) {
      /*
        { [Error: socket hang up] code: 'ECONNRESET' }
        use ECONNREFUSED for testing on localhost
        ETIMEDOUT will indicate the timeout was exceeded
      */
      if (err.code === 'ECONNRESET') {
        var t = currentTime();
        console.log('WARNING', 'ECONNRESET detected!', t);
        throw new Error('exiting ' + t); // parent self-destructs
      }
      else {
        console.log('WARNING', 'request: ', err);
        callback();
      }
    }

    if(body) {

      const $ = cheerio.load(body);
      const $live_matches = $('.live-match');
      var results = [];

      async.map($live_matches, ($m, next) => {
        // for each match in $live_matches, load it to $m
        const $ = cheerio.load($m);
        const _a = $('a.a-reset');
        _a.map((index, element) => {
          const game = {};
          game.status = 'live';
          game.match_url = `https://www.hltv.org${(element.attribs.href)}`;
          game.list_id = element.attribs.href.match(/(\d+)/)[0]; // regex: first string of numbers
          // game.list_id = $('table').attr('id', 'data-livescore-match').data('livescoreMatch'); // superfancy
          game.event_name = $('.event-name').eq(0).text();
          game.match_team1 = $('.team-name').eq(0).text();
          game.match_team2 = $('.team-name').eq(1).text();
          // TODO start date and time UTC
          // game.match_team1_id = $('img.logo').attribs.src.match(/(\d+)/)[0];  // TODO. TO HERE.
          results.push(game);
        });
        next();

      }, (err) => {
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

  }); // request
}; // module.exports

module.exports.getUpcomingGames = (callback) => {
  request({ uri: url, forever: false }, (err, response, body) => { // disable keepAlive
    if (err) {
      /*
        { [Error: socket hang up] code: 'ECONNRESET' } 100 % CPU starts a few minutes prior to this error.
        childProcesses continue to exist.
      */
      if (err.code === 'ECONNRESET') {
        console.log('WARNING', 'ECONNRESET detected!');
        throw new Error('exiting'); // parent self-destructs
      }
      else {
        console.log('WARNING', 'request: ', err);
        return callback();
      }
    }

    if(body) {
      var $ = cheerio.load(body);
      var $match_days = $('.match-day');
      var results = [];

    async.forEach($match_days, ($d, next) => {

      const $ = cheerio.load($d);
      const a = $('a.upcoming-match');

      a.map((index, element) => {
        const game = {};
        game.status = 'upcoming';
        game.match_url = `http://www.hltv.org${(element.attribs.href)}`;
        game.list_id = element.attribs.href.match(/(\d+)/)[0]; // regex: first string of numbers
        game.event_name = $('.event-name').eq(0).text();
        game.display_date = $('.standard-headline').text();
        game.display_time = $('.time').eq(0).text().trim();
        game.utc_timestamp = $('.time').html().trim().match(/(\d+)/)[0];

        /*
        game.time_div = $('.time').html().trim();
        the time div can be parsed to produce the unix date:
        <div class="time" data-time-format="HH:mm" data-unix="1495576800000">15:00</div>
        */

        game.match_team1 = $('.team').eq(0).text();
        game.match_team2 = $('.team').eq(1).text();
        // team id's can be found in the .logo src string
        results.push(game);
      });

      next();

      }, (err) => {
        if (err) {
          console.log('WARNING', 'async: ', err);
          callback();
        } else {
          callback(results);
        }
      });
    }

  }); // request
}; // module.exports

var currentTime = () => {
  _time = new Date().toISOString().
  replace(/T/, ' ').    // replace T with a space
  replace(/\..+/, '');
  return _time;
};
