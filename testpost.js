var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:56285/api/v1/CSGO/GameOdds',
  qs:
   { sportsbook_id: '1',
     bettype_id: '1',
     hltv_game_id: '2313796',
     terms1: '1.760',
     terms2: '2.010' },
  headers:
   { 'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
